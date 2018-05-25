//const API_SERVER = 'http://lima-vc-2.sdsc.optiputer.net/cloud-scheduler-gui/scripts'
const API_SERVER = 'http://rocks-54.sdsc.edu/cloud-scheduler/scripts'


export const MAP_ENDPOINT = API_SERVER+'/getDashboard.py'
export const CARD_ENDPOINT = API_SERVER+'/GetSiteDescription.py'
export const AUTHEN_ENDPOINT = API_SERVER+'/signIn.py'
export const SET_TIMEZONE_ENDPOINT = API_SERVER+'/setTimezone.py'
export const SEARCH_RESOURCE_ENDPOINT = API_SERVER+'/Search.py'
export const CHECK_RESERVATION_ENDPOINT = API_SERVER+'/CheckForReservation.py'
export const CONFIRM_RESERVATION_ENDPOINT = API_SERVER+'/CreateReservation.py'
export const CHECK_CONNECTION_TYPE_ENDPOINT = API_SERVER+'/checkConnectionType.py'
export const MY_RESERVATIONS_ENDPOINT = API_SERVER+'/getMyReservations.py'
export const MY_ENDED_RESERVATIONS_ENDPOINT = API_SERVER+'/getMyEndedReservations.py'
export const ALL_RESERVATIONS_ENDPOINT = API_SERVER+'/getAllReservations.py'
export const ALL_ENDED_RESERVATIONS_ENDPOINT = API_SERVER+'/getAllEndedReservations.py'
export const EXTEND_RESERVATION_ENDPOINT = API_SERVER+'/extendReservation.py'
export const DELETE_RESERVATION_ENDPOINT = API_SERVER+'/cancelReservation.py'
export const GET_ALL_IMAGES_ENDPOINT = API_SERVER+'/getAllImages.py'
export const FORGET_PASSWORD_ENDPOINT = API_SERVER+'/forgetPassword.py'
export const SIGNOUT_ENDPOINT = API_SERVER+'/signOut.py'
export const RESET_PASSWORD_ENDPOINT = API_SERVER+'/confirmForgetPassword.py'
export const TEST = API_SERVER+'/test.py'