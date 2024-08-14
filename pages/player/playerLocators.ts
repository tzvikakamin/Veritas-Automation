const PLAYER_LOCATORS = {
    // login
    USERNAME_INPUT: '#login',
    PASSWORD_INPUT: '#password',
    LOGIN_BUTTON: '.btn-login',

    // enter id
    ID_INPUT: '#id-code',
    START_BUTTON: '[class="button button-blue__light"]',

    // choosing language
    HELLO_WINDOW:'.modal-body',
    OK_BUTTON: 'button[class="button button-blue__light"]',

    // in test
    QUESTION_TEXT: 'app-question-text',
    // QUESTION_TYPE: '[answertype]',
    QUESTION_SINGLE_CHOICE: '[answertype="singlebottomGrid"]',
    ANSWER_OPTION_BUTTON: 'app-answer-text-position',
    QUESTION_FREE_TEXT: 'textarea[answertype="freetext"]',
    ANSWER_TEXT_INPUT: 'textarea[answertype="freetext"]',
    NEXT_BUTTON: 'button[data-sentry-id="pass-done"]',
}

export default PLAYER_LOCATORS

export const URL = '/nplayer/login'