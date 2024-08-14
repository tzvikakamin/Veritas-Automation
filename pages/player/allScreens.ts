import cameraQuestion from './screens/cameraQuestion'
import candidateNotFoundScreen from './screens/candidateNotFound'
import clickNext from './screens/clickNext'
import { datePicker } from './screens/datePicker'
import freeTextQuestion from './screens/freeText'
import helloScreen from './screens/helloSection'
import popupClose from './screens/popupClose'
import questionScreen from './screens/question'
import questionnaire from './screens/questionnaire'
import recordScreen from './screens/recordScreen'
import singleChoice from './screens/singleChoice'


const allScreens = [
    // cameraQuestion, working through clickNext
    questionScreen,
    popupClose,
    clickNext,
    questionnaire,
    datePicker,
    helloScreen,
    singleChoice,
    freeTextQuestion,
    candidateNotFoundScreen,
    // cameraScreen, //todo create it
    // recordScreen, //todo check it later
]

export default allScreens