class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

const numberRepo = new Repository<number>();
numberRepo.add(1);
numberRepo.add(2);
console.log(numberRepo.getAll()); // [1, 2]

const stringRepo = new Repository<string>();
stringRepo.add("a");
stringRepo.add("b");
console.log(stringRepo.getAll()); // ["a", "b"]