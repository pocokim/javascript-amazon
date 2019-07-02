class MyPromise {
    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thensCallback = undefined;
        cb(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        this.value = value;
        this.state = 'fulfilled';
        //resolve에서 저장한 then의 콜백함수를 then과 함께 다시실행하도록 함
        this.then(this.thensCallback);
    }

    reject() {

    }

    then(cb) {
        let extraParam = this.value;
        this.thensCallback = cb;
        // console.log('여기는 다 실행됨',this.value);
        if (this.value === undefined) return 
        const fetchedValue = cb(extraParam);
    }


}

let mySecondPromise = new MyPromise((MyResolve, MyReject) => {
    setTimeout(() => {
        MyResolve({ "name": "Success!", "id": 123123 });
    }, 1000);
})


mySecondPromise.then((successMessage) => {
    // console.log("여기는 Promise의 상태가 변해야만 실행됨",successMessage)
    return successMessage.name;
})

// 구현되어야할 예제 
// let myFirstPromise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({"name":"Success!", "id" :123123});
//     }, 1000);
//   });

//   myFirstPromise.then((successMessage) => {
//     return successMessage.name;
//   }).then((data) => {
//     console.log(`data is ${data}`)
//   })