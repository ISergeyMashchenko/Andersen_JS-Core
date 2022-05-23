class Car {
    #brand;
    #model;
    #yearOfManufacturing;
    #maxSpeed;
    #maxFuelVolume;
    #fuelConsumption;
    #currentFuelVolume = 0;
    #isStarted = false;
    #mileage = 0;

    get brand() {
        return this.#brand;
    }

    set brand(brand) {
        if (typeof brand === 'string' && brand.length > 1 && brand.length <= 50) {
            this.#brand = brand;
        }
    }

    get model() {
        return this.#model;
    }

    set model(model) {
        if (typeof model === 'string' && model.length > 1 && model.length <= 50) {
            this.#model = model;
        }
    }

    get yearOfManufactoring() {
        return this.#yearOfManufacturing;
    }

    set yearOfManufactoring(year) {
        if (typeof year === 'number' && year >= 1900 && year <= 2022) {
            this.#yearOfManufacturing = year;
        }
    }

    get maxSpeed() {
        return `${this.#maxSpeed} км/ч`;
    }

    set maxSpeed(speed) {
        if (typeof speed === 'number' && speed >= 100 && speed <= 300) {
            this.#maxSpeed = speed;
        }
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume;
    }

    set maxFuelVolume(volume) {
        if (typeof volume === 'number' && volume >= 5 && volume <= 20) {
            this.#maxFuelVolume = volume;
        }
    }

    get fuelConsumption() {
        return `${this.#fuelConsumption} л/100км`;
    }

    set fuelConsumption(consumption) {
        if (typeof consumption === 'number') {
            this.#fuelConsumption = consumption;
        }
    }

    get currentFuelVolume() {
        return this.#currentFuelVolume;
    }

    get isStarted() {
        return this.#isStarted;
    }

    get mileage() {
        return this.#mileage;
    }

    start() {
        if (this.#isStarted) {
            throw new Error('Машина уже заведена');
        } else {
            this.#isStarted = true;
        }
    }

    shutDownEngine() {
        if (this.#isStarted) {
            this.#isStarted = false;
        } else {
            throw new Error('Машина ещё не заведена');
        }
    }

    fillUpGasTank(litre) {
        if (typeof litre !== 'number' || litre <= 0) {
            throw new Error('Неверное количество топлива для заправки');
        }

        if (this.#maxFuelVolume - this.#currentFuelVolume < litre) {
            throw new Error('Топливный бак переполнен');
        }

        this.#currentFuelVolume += litre;
    }

    drive(speed, hours) {
        if (typeof speed !== 'number' || speed <= 0) {
            throw new Error('Неверная скорость');
        }

        if (typeof hours !== 'number' || hours <= 0) {
            throw new Error('Неверное количество часов');
        }

        if (speed > this.#maxSpeed) {
            throw new Error('Машина не может ехать так быстро');
        }

        if (!this.#isStarted) {
            throw new Error('Машина должна быть заведена, чтобы ехать');
        }

        const fuelVolume = (speed * hours * this.#fuelConsumption) / 100;

        if (fuelVolume > this.#currentFuelVolume) {
            throw new Error('Недостаточно топлива');
        }

        this.#currentFuelVolume -= fuelVolume;
        this.#mileage += speed * hours;
    }
}