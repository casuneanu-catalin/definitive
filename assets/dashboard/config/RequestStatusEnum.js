export class RequestStatusEnum {
    static pending = new RequestStatusEnum("Pending Approval", "yellow");
    static approved = new RequestStatusEnum("Earning", "blue");
    static completed = new RequestStatusEnum("Completed", "green");
    static rejected = new RequestStatusEnum("Rejected", "pink");

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}