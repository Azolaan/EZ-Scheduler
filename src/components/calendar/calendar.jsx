import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import { ViewState, EditingState } from "@devexpress/dx-react-scheduler"
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    EditRecurrenceMenu,
    AppointmentForm,
    AppointmentTooltip,
    AllDayPanel
} from "@devexpress/dx-react-scheduler-material-ui"
import { Button } from "@rmwc/button"

import { CirclePicker } from "react-color"

import "./calendar.css"

class BasicLayoutComponent extends React.Component {
    state = {}

    _handleColorChange = (color) => {
        this.props.onFieldChange({ color: color.hex })
    }

    _handleFieldChange = (change) => {
        let startDate =
            _.get(change, "startDate") || this.props.appointmentData.startDate
        let endDate =
            _.get(change, "endDate") || this.props.appointmentData.endDate

        let invalid = endDate - startDate < 0
        if (invalid) {
            alert("Start date cannot be after end date")
        } else {
            this.props.onFieldChange(change)
        }
    }

    render() {
        return (
            <AppointmentForm.BasicLayout
                {...this.props}
                onFieldChange={this._handleFieldChange}
            >
                <AppointmentForm.Label text="Colour" type="title" />
                <CirclePicker
                    color={this.props.appointmentData.color}
                    onChangeComplete={this._handleColorChange}
                />
            </AppointmentForm.BasicLayout>
        )
    }
}

class AppointmentComponent extends React.Component {
    render() {
        return (
            <Appointments.Appointment
                {...this.props}
                style={{
                    borderRadius: "8px",
                    backgroundColor: this.props.data.color
                }}
            />
        )
    }
}

class CalendarComponent extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        editable: PropTypes.bool,
        onAddEvent: PropTypes.func,
        onEditEvent: PropTypes.func,
        onDeleteEvent: PropTypes.func
    }

    static defaultProps = {
        editable: true
    }

    state = {
        currentDate: new Date(),
        editingEvent: undefined,
        addingEvent: undefined,
        editingFormVisible: false,
        saveButtonDisabled: false
    }

    _handleCurrentDateChange = (currentDate) => {
        this.setState({ currentDate })
    }

    _handleCommitChange = ({ added, changed, deleted }) => {
        if (added) this.props.onAddEvent(added)
        if (changed) this.props.onEditEvent(changed)
        if (deleted) this.props.onDeleteEvent(deleted)
    }

    _handlePreCommitChanges = (changes, appointment, type) => {
        if (type === "all" && !changes) {
            return { deleted: appointment.id }
        }
        if (type) {
            return {
                changed: { [appointment.id]: { changes, appointment, type } }
            }
        }
    }

    _handleEditingAppointmentChange = (appointment) => {
        this.setState({ editingEvent: appointment })
    }

    _handleAddingAppointmentChange = (appointment) => {
        this.setState({ addingEvent: appointment })
    }

    _toggleEditingFormVisibility = () => {
        this.setState((state) => ({
            editingFormVisible: !state.editingFormVisible
        }))
    }

    _handleCreateEvent = () => {
        let startDate = new Date()
        let endDate = new Date()
        endDate.setHours(startDate.getHours() + 1)

        const newEvent = {
            title: undefined,
            allDay: false,
            startDate,
            endDate,
            color: "#2196f3"
        }

        this.setState({ addingEvent: newEvent, editingFormVisible: true })
    }

    render() {
        return (
            <>
                <Scheduler
                    class="calendar"
                    data={this.props.data}
                    firstDayOfWeek={1}
                >
                    <ViewState defaultCurrentDate={this.state.currentDate} />
                    <WeekView startDayHour={8} endDayHour={24} />
                    <AllDayPanel />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments appointmentComponent={AppointmentComponent} />
                    {this.props.editable && (
                        <EditingState
                            onCommitChanges={this._handleCommitChange}
                            preCommitChanges={this._handlePreCommitChanges}
                            editingAppointment={this.state.editingEvent}
                            addedAppointment={this.state.addingEvent}
                            onEditingAppointmentChange={
                                this._handleEditingAppointmentChange
                            }
                            onAddedAppointmentChange={
                                this._handleAddingAppointmentChange
                            }
                        />
                    )}
                    {this.props.editable && <EditRecurrenceMenu />}
                    <AppointmentTooltip
                        showOpenButton={this.props.editable}
                        showDeleteButton={this.props.editable}
                    />
                    <AppointmentForm
                        visible={this.state.editingFormVisible}
                        onVisibilityChange={this._toggleEditingFormVisibility}
                        basicLayoutComponent={BasicLayoutComponent}
                        readOnly={!this.props.editable}
                    />
                </Scheduler>
                <Button
                    className="calendar-create-button"
                    label="Create"
                    icon="add"
                    onClick={this._handleCreateEvent}
                    disabled={!this.props.editable}
                    outlined
                />
            </>
        )
    }
}

export { CalendarComponent, CalendarComponent as default }
