
const htmlText = (ORGANIZATION_NAME = '', POSITION_NAME = '') => /*html*/`
<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
    <meta name="color-scheme" content="light dark" />
    <title> Player Runner</title>

</head>

<body class="container" style="max-width: 1000px">

    <header>
        <br>
        <h1>Player Runner</h1>
    </header>


    <main class="container">
        <h4>What would you like to do?</h4>

        <button id="1" class="primary" value="1">Run existing Candidate in the Player</button><br><br>
        <button id="2" class="secondary" value="2">Create new Candidate</button><br><br>
        <button id="3" class="secondary" value="3">Connect Position to Organization</button><br><br>
        <button id="4" class="secondary" value="4">Connect Organization to Assessment-Group</button><br><br>
        <button id="5" class="secondary" value="5">Create new Assessment-Group</button>

    </main>

    <footer>
        <a href="/close">close</a>
    </footer>
</body>

<script>
    const main = document.querySelector('main')
    const form = document.createElement('form')
    form.action = '/results'

    // const results = document.createElement('p')
    // results.id = 'results'
    // const dataObject = { operation: 0 }

    const buttons = document.querySelectorAll('button')

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const operation = button.value
            const header = button.innerText

            // dataObject.operation = operation
            // dataObject.ORGANIZATION_NAME = '${ORGANIZATION_NAME}'
            // dataObject.POSITION_NAME = '${POSITION_NAME}'

            menu(operation, header)
        })
    })


    // function createResults(dataObject = {}) {
    //     main.innerText = ''
    //     document.querySelector('footer').innerText = 'Thank you. The information sent to Meby-Bot'
    //     results.innerText = JSON.stringify(dataObject, null, 2)
    //     main.appendChild(results)
    // }

    function createHeader(text) {
        const h4 = document.createElement('h4')
        h4.innerText = text

        main.appendChild(h4)
    }

    function createInput(text, key, value = '', hide = false) {
        const label = document.createElement('label')
        label.for = key
        if (hide) label.style.display = 'none'
        label.innerText = text

        form.appendChild(label)


        const input = document.createElement('input')
        if (hide) input.style.display = 'none'
        input.type = 'text'
        input.id = key
        input.name = key
        input.placeholder = text
        input.value = value

        // input.onchange = () => {
        //     dataObject[key] = input.value
        // }

        form.appendChild(input)
    }

    function createSelect() {
        const count = document.querySelectorAll('select').length + 1

        const select = document.createElement('select')
        select.name = 'assessmentsTypes'

        const options = ['option 1', 'option 2', 'option 3']

        options.forEach((option) => {
            const optionEL = document.createElement('option')
            optionEL.value = option
            optionEL.innerText = option
            select.appendChild(optionEL)
        })

        return select
    }

    function createAssessmentInput() {
        const count = document.querySelectorAll('input[name*="assessment"]').length+1

        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'assessments'
        input.placeholder = 'Assessment '+count


        const option = document.createElement('option')

        return input
    }

    function addAssessment() {
        const input = createAssessmentInput()
        const select = createSelect()

        const container = document.createElement('div')
        container.className = 'grid'
        container.append(input, select)

        form.insertBefore(container, document.querySelector('#addAssessment'))
        input.focus()
    }

    function createAddButton() {
        const button = document.createElement('button')
        button.type = 'button'
        button.id = 'addAssessment'
        button.innerText = 'Add Assessment'

        button.onclick = addAssessment
        form.appendChild(button)
    }

    function menu(operation, header) {
        main.innerHTML = ''

        createHeader(header)

        main.appendChild(document.createElement('hr'))
        main.appendChild(form)

        // add operations here!👇
        createInput('operation', 'operation', operation, true)
        switch (operation) {
            case '1':
                createInput('Candidate ID', 'id')
                break

            case '2':
            case '3':
                createInput('organization', 'ORGANIZATION_NAME', '${ORGANIZATION_NAME}')
                createInput('position', 'POSITION_NAME', '${POSITION_NAME}')
                break

            case '4':
                createInput('organization', 'ORGANIZATION_NAME', '${ORGANIZATION_NAME}')
                createInput('assessment-group', 'GROUP_NAME')
                break

            case '5':
                createAddButton()
                addAssessment()
                break
        }
        // add operations here!👆


        main.appendChild(document.createElement('hr'))

        const submitButton = document.createElement('input')
        submitButton.type = 'submit'
        submitButton.value = 'submit'
        // submitButton.id = 'submit'
        // submitButton.innerText = 'submit'

        // submitButton.onclick = () => {
        //     createResults(dataObject)
        // }

        form.appendChild(submitButton)


        const backButton = document.createElement('a')
        backButton.href = ''
        backButton.innerText = 'back'
        backButton.className = 'secondary'

        document.querySelector('footer').prepend(backButton)

    }


</script>

</html>
`

export default htmlText