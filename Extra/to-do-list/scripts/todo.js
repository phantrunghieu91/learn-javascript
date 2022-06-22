class Todo {
    constructor(title, status = false) {
        this.title = title;
        this.status = status;
    }

    getStatus = () => {
        return this.status;
    };

    getTitle = () => {
        return this.title;
    };

    setStatus = (status) => {
        this.status = status;
    }
};