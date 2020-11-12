import { generateUUID } from '../utils/uuid'

let schedulerData = [
    {
        id: generateUUID(),
        startDate: new Date("2020-09-06T10:30"),
        endDate: new Date("2020-09-06T11:20"),
        title: "STATS 3Y03 C02 - Probability & Stats For Eng",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,TH;UNTIL=20201210T110000Z",
        color: "#2196f3"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T11:30",
        endDate: "2020-09-06T12:20",
        title: "SFWRENG 4HC3 T03 - Human Computer Interfaces",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO;UNTIL=20201210T110000Z",
        color: "#ff5722"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T14:30",
        endDate: "2020-09-06T15:20",
        title: "SFWRENG 4HC3 C01 - Human Computer Interfaces",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201210T110000Z",
        color: "#ff5722"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T12:30",
        endDate: "2020-09-06T13:20",
        title: "SFWRENG 4AA4 C01 - Real Time Systems",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,TH;UNTIL=20201210T110000Z",
        color: "#e91e63"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T13:30",
        endDate: "2020-09-06T14:20",
        title: "SFWRENG 4AA4 C01 - Real Time Systems",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TU;UNTIL=20201210T110000Z",
        color: "#e91e63"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T14:30",
        endDate: "2020-09-06T17:20",
        title: "SFWRENG 4AA4 L01 - Real Time Systems",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TU;UNTIL=20201210T110000Z",
        color: "#e91e63"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T11:30",
        endDate: "2020-09-06T12:20",
        title: "SFWRENG 4E03 T01 - Perf.Anal.Comp.Syst",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=WE;UNTIL=20201210T110000Z",
        color: "#673ab7"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T16:30",
        endDate: "2020-09-06T17:20",
        title: "SFWRENG 4E03 C01 - Perf.Anal.Comp.Syst",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,TH;UNTIL=20201210T110000Z",
        color: "#673ab7"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T17:30",
        endDate: "2020-09-06T18:20",
        title: "SFWRENG 4G06A C01 - Sfwr Design IV",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,TH;UNTIL=20201210T110000Z",
        color: "#4caf50"
    },
    {
        id: generateUUID(),
        startDate: "2020-09-06T18:30",
        endDate: "2020-09-06T19:20",
        title: "Capstone Group Meeting",
        rRule:
            "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=FR;UNTIL=20201210T110000Z",
        color: "#4caf50"
    }
]

export { schedulerData }