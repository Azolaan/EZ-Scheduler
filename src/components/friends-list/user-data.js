import alexLo from './images/alex-lo.png'
import gabrielYu from './images/gabriel-yu.png'
import lawrenceChung from './images/lawrence-chung.png'
import jimmyTam from './images/jimmy-tam.png'

const userData = [
    {
        id: 1,
        image: alexLo,
        name: 'Alex Lo',
        username: 'loa@mcmaster.ca',
        Password: '123456',
        School: 'McMaster University',
        Major: 'Software Engineering',
        Year: 4,
        Bio: 'Hi! John here, I\'m in mt last year of Software Engineering.',
        isUserZero: false,
        isFriend: true,
        showProfile: false,
        showChat: false,
        showCalendar: false,
        sendFriendRquest: false
    },
    {
        id: 2,
        image: gabrielYu,
        name: 'Gabriel Yu',
        username: 'yug13@mcmaster.ca',
        Password: '123456',
        School: 'McMaster University',
        Major: 'Nursing',
        Year: 3,
        Bio: 'Hi I\'m Gabriel and I\'m in my third year of Nursing. My favourite sport is ultimite frisebee!',
        isUserZero: false,
        isFriend: true,
        showProfile: false,
        showChat: false,
        showCalendar: false,
        sendFriendRquest: false
    },
    {
        id: 3,
        image: lawrenceChung,
        name: 'Lawrence Chung',
        username: 'chungl1@mcmaster.ca',
        Password: '123456',
        School: 'McMaster University',
        Major: 'Finance',
        Year: 2,
        Bio: 'Hi I\'m Lawrence and I\'m in my second year of Finance. My favourite hobby is keyboard building!',
        isUserZero: false,
        isFriend: false,
        showProfile: false,
        showChat: false,
        showCalendar: false,
        sendFriendRquest: false
    },
    {
        id: 4,
        image: jimmyTam,
        name: 'Jimmy Tam',
        username: 'tamk7@mcmaster.ca',
        Password: '123456',
        School: 'McMaster University',
        Major: 'Accounting',
        Year: 2,
        Bio: 'Hi I\'m Jimmy and I\'m in my second year of Accounting. I like to play tennis during my free time!',
        isUserZero: false,
        isFriend: false,
        showProfile: false,
        showChat: false,
        showCalendar: false,
        sendFriendRquest: false
    },
]

export { userData, userData as default }