# 목차

[1. 객체](#1.-객체)  
[2. 참조에 의한 객체 복사](#2.-참조에-의한-객체-복사)  
[3. 가비지 컬렉션](#3.-가비지-컬렉션)  
[4. 메서드와 'this'](#4.-메서드와-'this')  
[5. 'new' 연산자와 생성자 함수](#5.-'new'-연산자와-생성자-함수)  
[6. 옵셔널 체이닝 '?.' ](#6.-옵셔널-체이닝-'?.')  
[7. 심볼형](#7.-심볼형)  
[8. 객체를 원시형으로 변환하기](#8.-객체를-원시형으로-변환하기)

# 1. 객체

## 학습내용

### 1. 객체의 생성과 구성

- 빈 서랍장 만들고 Object literal 방식으로 선언

```javascript
let user = new Object(); //객체 생성자 문법
let user = {}; //객체 리터럴 문법 -> 더 자주 사용
let job = "programmer";
const user = {
  name: "John",
  age: 30,
  "like birds": false /*복수의 단어는 따옴표로 묶아야됨*/,
  /*객체 속 객체 */
  size: {
    height: 182,
    width: 50,
  },
  /*개선된 프로퍼티*/
  [job + "place"]: 5, //key를 대괄호로 묶으면 복잡한 표현식이 올 수 있다
};

/*단축 프로퍼티 -> 함수 내의 객체에서 많이 사용*/
function makeUser(name, age) {
  return {
    name, //name: name,
    age, //age: age,
  };
}
```

1. 접근법

- 점 표기법으로 접근 `user.name`
- 대괄효 표기법으로 접근 `user["like birds"]`
- 개선된 프로퍼티로 접근 `user["programmerplace"]`
- const형으로 객체 선언에도 내부 프로퍼티 바꾸기, 접근 등은 전부 가능! 다만 객체 `const user= `자체를 설정하려고 할 때 오류가 남

2. 프로퍼티 특징

- key 이름엔 딱히 제약이 없다
- 문자열, 심볼형 아니면 문자열로 자동 형변환이 일어난다
- 예외 ) **proto** -> 인식되지 않음
- 정수 프로퍼티는 자동으로 순서대로 정렬되어 출력된다 -> 원하는 정렬순서대로 하고 싶다면 문자열로 프로퍼티를 설정

## 2. 객체 메소드

```javascript
//객체 안에 key가 존재하는 지 확인 가능
let user = {age:undefined};

console.log{age in user); //undefined
console.log("age" in user); //true

//객체 안의 모든 키를 순회
for(let key in user){ //주의할 것은 여기서 key를 새롭게 선언해주는 것임
    console.log(key); //키에 해당하는 값
    console.log(user[key]); //value에 해당하는 값
}

//프로퍼티 삭제
delete user.age;
```

## 과제

1. 주의할 것 ) 기본적으로 객체에 값을 넣을 때, "" 안에 넣어야 문자열로 인식이 된다

```javascript
let user = { name: "Nahee" };
for (let key in user) {
  console.log(key);
  console.log(key in user);
  console.log(
    user["name"]
  ); /*대괄호로 접근할 땐 key여도 큰따옴표 붙여서 접근해야한다!*/
}
```

```javascript
function isEmpty(obj) {
  for (let key in obj) {
    /*이 반복문 자체가 코드 하나는 있어야 실행됨*/
    return false;
  }
  return true;
}
```

```javascript
function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == "number") {
      //typeof 다음에 괄호 없음!! 그리고 형식 비교할 땐 무조건 따옴표 써주기
      obj[key] *= 2;
    }
  }
}
```

# 2. 참조에 의한 객체 복사

> 전제) 기본적으로 객체는 reference에 의해 저장되고 복사된다

1. 객체가 할당된 변수를 복사할 땐 객체의 reference값이 복사되고, 객체는 복사되지 않는다.
   -> 따라서 여러 변수를 통해서 객체를 조작할 수 있다 ) 그냥 가리키는 화살표들이 늘어나는 느낌! ( ==, === 연산자로 확인해보면 true가 나온다, 같은 것을 가리키기 때문)

```javascript
let user = { name: "John" };
let admin = user;

admin.name = "Pete"; // 'admin' 참조 값에 의해 변경됨
alert(user.name); // 'Pete'가 출력됨. 'user' 참조 값을 이용해 변경사항을 확인함

console.olg(user == admin); //true

let a = {};
let b = {};
console.log(a == b); //false -> 위의 케이스가 참조에 의한 복사임을 보여줌
```

2. reference 가 아니라 value값 진으로 복사하는 방법

> Shallow copy -> 객체 속 객체프로퍼티는 복사하지 못함, 객체 속 객체프로퍼티는 여전히 참조로 복사됨

- 직접 순회하면서 복사

```javascript
let user={
    name: "Nahee",
    age: 21
};

let clone={}l
for(let key in user){
    clone[key]=user[key];
}
```

- `Object.assign(mainobj,src1, src2, ... )` 이용함

```javascript
let user = {
  name: "Nahee",
  age: 21,
};
let permission = { coding: true };

Object.assign(user, permission);
let clone = Object.assign({}, user, permission);
```

> Deep cloning -> 객체 속 객체프로퍼티까지 복사 가능
> [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data)

# 3. 가비지 컬렉션

> 전제) 자바스크립트는 우리가 버린 더 이상 쓸모 없어진 것을 찾아내 삭제한다!  
> 아주 좋은 듯! C에선 동적 메모리 할당하고 없애주고 일일히 했는데 알아서 해준다고 한다!

1. 가비지 컬렉션은 엔진이 자동으로 수행하므로 개발자는 이를 억지로 실행하거나 막을 수 없습니다.
2. 객체는 도달 가능한 상태일 때 메모리에 남습니다.(화살표 내뿜기만 하는 아이는 삭제된다.)
3. 참조된다고 해서 도달 가능한 것은 아닙니다. 서로 연결된 객체들도 도달 불가능할 수 있습니다.

# 4. 메서드와 'this'

## 학습내용

### 1. 메서드

- 객체 내부의 함수를 메서드라고 한다.

```javascript
// 아래 두 객체는 동일하게 동작합니다.
let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용하니 더 깔끔해 보이네요.
let user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};

/*외부에서 객체 프로퍼티 추가*/
let sayBye = function()=>alert("bye");
user.sayBye = sayBye;
```

### 2. this 이용법

> 메서드 내부에선 this로 객체를 참조한다.

- 객체 내부의 메소드에서 객체 프로퍼티 사용할 때 ) 현재 객체를 가리킴

```javascript
let user= {
    name = "Nahee",
    age= "21",
    sayHi(){
        console.log(this.name); //만약 user.name을 통해서 접근하면 만약 레퍼런스 복사된 객체에서 user 레퍼런스 삭제하고 불렀을 대 에러 발생
    }
}
user.sayHi(); //Nahee
```

- 점 앞의 모든 객체의 값이 될 수 있는 this (일반적으로 다른 언어들과 다르므로 이거 잘 유의)
  -> 왜냐하면 JS의 this는 런타임에 의해 결정되기 때문이다.

```javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  console.log(this.name); //이때의 this는 이 함수를 부른 객체가 된다.
}

//각각의 객체에 sayHi 함수 추가
user.f = sayHi;
admin.f = sayHi;

user.f(); //John
admin.f(); //Admin
admin["f"](); //Admin
```

- 화살표 함수에서의 this
  > 화살표 함수에는 this가 없다!

```javascript
//화살표 함수
let group = {
  title: "1모둠",
  students: ["보라", "호진", "지민"],

  showList() {
    this.students.forEach((student) => alert(this.title + ": " + student)); //화살표함수 내에는 this가 없으므로 외부함수 group.showList()의 this가 this가 된다. (직관적으로는 같은데 다른 뭉탱이에 포함되어 있는 this임.)
  },
};

group.showList();

//일반함수
let group = {
  title: "1모둠",
  students: ["보라", "호진", "지민"],

  showList() {
    this.students.forEach(function (student) {
      // TypeError: Cannot read property 'title' of undefined
      alert(this.title + ": " + student);
    });
  },
};

group.showList();
```

- 일반함수에서는 this가 forEach로 돌며 undefined.title에 접근하려 해서 에러 출력
- 화살표함수에서는 this가 group기준이므로 forEach의 영향령 하에 없음

## 과제

- 다음 코드의 결과는?

```javascript
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user = makeUser();

alert(user.ref.name); // 결과가 어떻게 될까요?
```

1. this가 함수 전체를 가리키므로 this는 undifined가 됨(메서드가 아니라 함수로서 호출됨)
2. this를 쓰고 싶다면

```javascript
function makeUser() {
  return {
    name: "John",
    ref() {
      return this; //이렇게 두면 this값은 . 앞의 객체가 된다.
    },
  };
}
let user = makeUser();
console.log(user.ref().name); //ref()함수가 user안으로 들어가 user.ref() 자체가 하나의 객체 역할을 한다 (최종적으로는 makeUser()함수 안에서 this.name을 호출하는 것과 같다.)
```

- 주의할 것

1. 객체에서 간단하게 프로퍼티를 a,b 이런 식으로 쓰려면 그 객체가 함수 속에 있어야 한다. `a:a` ,`b:b`의 줄임이기 때문에 우측항에 올 값은 함수 파라미터로 받아와야한다.
2. 메서드 축약형과 메서드 본 형 둘 다 헷갈리지 말 것 ...

```javascript
let calculator = {
  a: "0", //a,b, 로 쓸 수 없음. 받아온 값이 없으므로 , 근데 이거 안써도 된다.
  b: "0",
  read() {
    this.a = +prompt("숫자 하나를 입력하세요");
    this.b = +prompt("아까 숫자에 더하고 싶은 값을 입력하세요");
  },
  sum: function () {
    return this.a + this.b;
  },
  mul: function () {
    return this.a * this.b;
  },
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());
```

3. 체이닝으로 메소드를 쓸 때에는 this가 가리키는 대상을 계속 신경 써야함

```javascript
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this; // 얘가 함수문 빠져나가 체이닝으로 가리키는 this가 객체가 되도록 함
  },
  down() {
    this.step--;
    return this; //얘가 함수문 빠져나가 체이닝으로 가리키는 this가 객체가 되도록 함
  },
  showStep() {
    alert(this.step);
    return this; //얘가 함수문 빠져나가 체이닝으로 가리키는 this가 객체가 되도록 함. 이 뒤에 뭐 없다면 이 함수는 이거 굳이 안써줘도 됨.
  },
};

ladder.up().up().down().up().down().showStep(); // 1
```

# 5. 'new' 연산자와 생성자 함수

## 학습내용

1. 생성자 함수
   > 일반함수와 같지만, new 연산자를 이용해 그 함수에 있는 요소들을 비슷한 서로 다른 객체에 집어넣기 용이하다! 비슷한 객체들 여럿 만들 때 유용하게 사용한다
   ```javascript
   function User(name) {
     this.name = name;
     this.isAdmin = false;
     this.sayHi = function () {
       alert("My name is: " + this.name);
     };
   }
   let user1 = new User(
     "Jack"
   ); /*new연산자를 이용하여 user에 대입하면 user객체가 만들어짐*/
   let user2 = new User("Amy");
   ```

- 저렇게 만들어진 user객체들은 아래 코드와 같다

```javascript
let user1 = {
  name: "Jack",
  isAdmin: false,
  sayHi: function () {
    alert("My name is: " + this.name);
  },
};
/*아래와 같은 식으로 접근 가능*/
user1.name;
user1.isAdmin;
user1.sayHi();
```

- 주의할 것 ) 첫 문자가 대문자인 함수는 무조건 new를 붙여 실행할 것
- new를 붙이는 순간 new가 붙은 그 자체에 대해서는 재사용 불가) 재사용 불가능한데 복잡한 객체 만들 때에도 new 이용

```javascript
let user = new (function () {
  this.name = "John";
  this.isAdmin = false;

  // 사용자 객체를 만들기 위한 여러 코드.
  // 지역 변수, 복잡한 로직, 구문 등의
  // 다양한 코드가 여기에 들어갑니다.
})();
```

2. 생성자와 return문
   > 생성자 함수엔 리턴 문이 없다! 반환할 것들은 모두 this에 저장되고 this는 자동반환되기 때문에 쓸 필요가 없다.
3. new.target
   > 함수가 new와 함께 호출되었는 지, 일반적으로 호출되었는 지를 알 수 있다
   > `new.target`을 호출하면 new의 타겟이 되는 객체가 나오는 것이다!

```javascript
function User() {
  alert(new.target);
}

// "new" 없이 호출함
User(); // undefined

//"new"를 붙여 호출함
new User(); // function User { ... }
```

## 과제

1. 계산기 만들기 ) _주의_ 객체가 변수에 지속적으로 접근하기 위해서는 let a 가 아닌 this.a에 저장해야 객체 프로퍼티로 세팅된다!!

```javascript
function Calculator() {
  this.read = function () {
    this.a = +prompt("첫번째 값을 입력하세요");
    this.b = +prompt("두번째 값을 입력하세요");
  };
  this.sum = function () {
    return this.a + this.b;
  };
  this.mul = function () {
    return this.a * this.b;
  };
}

let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());
```

2. 누산기 만들기 ) _주의_ prompt값 문자열이므로 형변환 해줘야한느 거 은근 자꾸 까먹는다!!

```javascript
function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function () {
    this.value += +prompt("숫자를 입력하세요");
  };
}
let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함
```

# 6. 옵셔널 체이닝 '?.'

> 보통 user.name.adress 이런 식으로 식을 쓸 떼, 중간 값이 비어있는 user의 경우 에러가 뜬다. 그런다 ?.를 사용하면 그 앞이 값이 정의되지 않은 경우, undefined를 반환하여 에러가 안난다. 그러나 주의할 것은, 꼭 있어야 하는 값이 없어서 못알아채도록 만들 수도 있어서 신중히 사용해야 한다.

```javascript
let user = null;

alert(user?.address); // undefined
alert(user?.address.street); // undefined
```

```javascript
let user1 = {
  firstName: "Violet",
};

let user2 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.

let key = "firstName";

alert(user1?.[key]); // Violet
alert(user2?.[key]); // undefined

alert(user1?.[key]?.something?.not?.existing); // undefined
```

- obj?.prop – obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환함
- obj?.[prop] – obj가 존재하면 obj[prop]을 반환하고, 그렇지 않으면 undefined를 반환함
- obj?.method() – obj가 존재하면 obj.method()를 호출하고, 그렇지 않으면 undefined를 반환함

# 7. 심볼형

> 유일한 식별자를 만들고 싶을 때 사용
> 외부에서 접근 불가능하고, 값도 덮어쓸 수 없는 프로퍼티 생성 가능
> 자바스크립트 시스템 심볼 Symbol.\*로 접근하면 내정 메서드 등 기본 동작 변경 가능

# 8. 객체를 원시형으로 변환하기

> 객체에 원시값을 기대하는 것을 사용할 때 객체-원시형 변환이 자동으로 일어남
> 객체끼리 더하거나 빼거나 등등 할 때 일어남!

```
객체-원시형으로의 형 변환은 hint를 기준으로 세 종류로 구분할 수 있습니다.

"string" (alert 같이 문자열을 필요로 하는 연산)
"number" (수학 연산)
"default" (드물게 발생함)
```

> 아래는 객체-원시형 형변환에 작용하는 알고리즘들임

```html
객체에 obj[Symbol.toPrimitive](hint)메서드가 있는지 찾고, 있다면 호출합니다. 1에
해당하지 않고 hint가 "string"이라면, obj.toString()이나 obj.valueOf()를
호출합니다. 1과 2에 해당하지 않고, hint가 "number"나 "default"라면
obj.valueOf()나 obj.toString()을 호출합니다.
```

1. `Symbol.toPrimitive`

- 메서드 하나로 모든 종류의 형변환을 다룰 수 있는 매직 아이템

```javascript
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

// 데모:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

2. `toString` 과 `valueOf`

- 아래 규칙에 따라 구식이지만 일일히 바꾸는 아이들 -`toString`은 문자열 반환, `valueOf`는 객체 자신을 반환

```javascript
let user = {
  name: "John",
  money: 1000,

  // hint가 "string"인 경우
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"인 경우
  valueOf() {
    return this.money;
  },
};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

3. 추가 형번환
