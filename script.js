class ToDoList {
    constructor(task) {
        this.list = [...task];
        this.countTask = this.list.length + 1;
        this.sortDirection = 1;
    }

    init() {
        this.setEventListenerForButton();
        this.setEventListenerForSort();
        document.querySelectorAll('.task__img').forEach((element) => {
            this.setEventListenerForRemove(element);
        });
        // console.log(this.list);
    }


    setEventListenerForButton() {
        let button = document.querySelector('.button');
        button.addEventListener('click', (event) => {
            let input = document.querySelector('.task__input');

            this.addTask(input.value);

            input.value = '';
        });
    }


    setEventListenerForSort() {
        let sort = document.querySelector('.sort__img');

        sort.addEventListener('mouseover', () => {
            sort.src = this.sortDirection !== -1 ? 'images/4.svg' : 'images/2.svg';
        });

        sort.addEventListener('mouseout', () => {
            sort.src = this.sortDirection !== -1 ? 'images/3.svg' : 'images/1.svg';
        });

        sort.addEventListener('click', () => {
            this.sort();
            this.sortDirection = this.sortDirection === 1 ? -1 : 1;
            sort.src = this.sortDirection === 1 ? 'images/4.svg' : 'images/2.svg';
        });
    }


    setEventListenerForRemove(item) {

        item.addEventListener('mouseover', () => {
            item.src = 'images/button-remove-hope.svg';
        });

        item.addEventListener('mouseout', () => {
            item.src = 'images/button-remove.svg';
        });

        item.addEventListener('click', (event) => {
            this.removeTask(event.target.previousElementSibling.name);
        });
    }


    addTask(valueTask) {
        let div = document.createElement('div');
        div.classList.add('task');

        let input = document.createElement('input');
        input.classList.add('task__input');
        input.value = valueTask;
        input.name = 'task' + this.countTask;
        input.placeholder = 'Введите задачу';
        div.append(input);

        let img = document.createElement('img');
        img.classList.add('task__img');
        img.src = 'images/button-remove.svg';
        this.setEventListenerForRemove(img);
        div.append(img);

        this.list.push(div);
        this.countTask++;

        this.updateList();
    }


    removeTask(element) {

        if (this.list.length !== 1) {
            this.list = this.list.filter((item) => {
                return item.firstElementChild.name !== element;
            });
        } else {
            this.list[0].firstElementChild.value = '';
        }


        this.updateList();
    }


    sort() {

        let listEmpty = this.list.filter(el => el.firstElementChild.value === '')

        let sorted = this.list
            .filter(el => el.firstElementChild.value !== '')
            .sort((task1, task2) => {
                let value1 = task1.firstElementChild.value;
                let value2 = task2.firstElementChild.value;

                if (value2 > value1) {
                    return 0;
                } else {
                    return 1;
                }
            });


        if (this.sortDirection === 1) {
            sorted.reverse();
        }

        this.list = listEmpty.concat(sorted);

        this.list.forEach(el => console.log(el.firstElementChild.value));
        this.updateList();
    }


    updateList() {

        let newInputField = document.querySelector('.input-field');
        newInputField.innerHTML = '';


        this.list.forEach((element) => {
            newInputField.append(element);
        });


        let sort = document.querySelector('.sort');
        sort.after(newInputField);

    }
}

let task = document.querySelectorAll('.task')
let list = new ToDoList(task);
list.init();