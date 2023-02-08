export class RequestTypeEnum {
    static deposit = new RequestTypeEnum("deposit");
    static withdraw = new RequestTypeEnum("withdraw");

    constructor(name) {
        this.name = name;
    }
}