import React from "react"
import _ from "lodash"

import { CalendarComponent } from "../components/calendar/calendar"
import { FriendsListComponent } from "../components/friends-list/friends-list"
import Profile from "../dialogs/profile/profile"

import { generateUUID } from "../utils/uuid"
import { schedulerData } from "../data/scheduler-data"

import "./main.css"

class MainPage extends React.Component {
    state = {
        data: schedulerData
    }

    _handleAddEvent = (added) => {
        const id = generateUUID()
        this.setState((state) => ({
            data: [...state.data, { ...added, id }]
        }))
    }

    _handleEditEvent = (changed) => {
        this.setState((state) => {
            let newAppointment
            let data = _.map(state.data, (event) => {
                if (_.get(changed, event.id)) {
                    let {
                        [event.id]: { changes, appointment, type }
                    } = changed

                    if (
                        (_.get(changes, "startDate") &&
                            isNaN(changes.startDate.valueOf())) ||
                        (_.get(changes, "endDate") &&
                            isNaN(changes.endDate.valueOf()))
                    ) {
                        return event
                    }

                    if (type === "all") {
                        if (
                            _.has(changes, "startDate") ||
                            _.has(changes, "endDate")
                        ) {
                            let startDate = new Date(event.startDate)
                            let endDate = new Date(event.endDate)

                            if (changes.startDate) {
                                startDate.setHours(changes.startDate.getHours())
                                startDate.setMinutes(
                                    changes.startDate.getMinutes()
                                )
                            }
                            if (changes.endDate) {
                                endDate.setHours(changes.endDate.getHours())
                                endDate.setMinutes(changes.endDate.getMinutes())
                            }

                            return { ...event, ...changes, startDate, endDate }
                        }
                        return { ...event, ...changes }
                    }
                    if (type === "current") {
                        let date = appointment.startDate.toISOString()
                        date = date
                            .replaceAll(":", "")
                            .replaceAll("-", "")
                            .replace(".000Z", "Z")

                        if (changes) {
                            newAppointment = {
                                ..._.omit(appointment, [
                                    "parentData",
                                    "rRule",
                                    "exDate"
                                ]),
                                id: generateUUID(),
                                ...changes
                            }
                        }

                        return {
                            ...event,
                            exDate: `${
                                event.exDate ? event.exDate : ""
                            },${date}`
                        }
                    }
                    if (type === "currentAndFollowing") {
                        let date = appointment.startDate
                        date.setMinutes(date.getMinutes() - 1)
                        date = date.toISOString()
                        date = date
                            .replaceAll(":", "")
                            .replaceAll("-", "")
                            .replace(".000Z", "Z")

                        if (changes) {
                            newAppointment = {
                                ..._.omit(appointment, ["parentData"]),
                                id: generateUUID(),
                                ...changes
                            }
                        }

                        return {
                            ...event,
                            rRule: event.rRule.replace(
                                /UNTIL=.{16}/,
                                `UNTIL=${date}`
                            )
                        }
                    }
                    if (!type) {
                        return { ...event, ..._.get(changed, event.id) }
                    }
                }
                return event
            })

            return {
                data: [...data, ...(newAppointment ? [newAppointment] : [])]
            }
        })
    }

    _handleDeleteEvent = (deleted) => {
        this.setState((state) => ({
            data: _.reject(state.data, { id: deleted })
        }))
    }

    render() {
        let userInfo = {
            name : "John Smith",
            userName : "SmiJ32",
            password : "**********",
            school : "McMaster University",
            major : "Software Engineering",
            year : "4",
            bio : "Hi! John here, i'm in my last year of Software Engineering"
        }
        return (
            <div class="main-page">
                <CalendarComponent
                    editable={true}
                    data={this.state.data}
                    onAddEvent={this._handleAddEvent}
                    onEditEvent={this._handleEditEvent}
                    onDeleteEvent={this._handleDeleteEvent}
                />
                <FriendsListComponent />           
                <Profile userInfo={userInfo}/>
            </div>
        )
    }
}

export { MainPage, MainPage as default }
