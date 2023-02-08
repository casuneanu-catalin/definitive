export class StakingContractsStatusEnum {
    static live = new StakingContractsStatusEnum("Enter", "green");
    static coming_soon = new StakingContractsStatusEnum("Coming Soon", "yellow");
    static expired = new StakingContractsStatusEnum("Sold Out", "pink");

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}