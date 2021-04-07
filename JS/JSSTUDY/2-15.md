# 2.15 함수

> 유사한 동작을 하는 코드들을 간편히 쓸 수 있도록!

1. 함수명 규칙 ) 함수는 동작 하나만 담당하도록 하고 어떤 동작을 하는 지 드러나는 이름이어야한다.

> "get…" – 값을 반환함  
> "calc…" – 무언가를 계산함  
> "create…" – 무언가를 생성함  
> "check…" – 무언가를 확인하고 불린값을 반환함

2. 기본형

```javascript
function 함수이름(복수의, 매개변수는, 콤마로, 구분합니다) {
  /* 함수 본문 */
}
```

3. 주의사항

- 매개변수를 전부 보내지 않으면 undefined가 기본으로 전달된다. -> 제어하고 싶으면 디폴트값 따로 설정해야한다.
- 전역변수명과 지역변수 명이 같으면 지역변수에 우선적용되며 전역변수가 무시된다.
- return은 줄바꿈 하면 자동으로 return; 이 된다.

## 과제

1. 아래 코드를 '?' 나 '||'를 사용해서 다시 작성하라

```javascript
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm("보호자의 동의를 받으셨나요?");
  }
}
```

```javascript
// '?'를 이용한 식으로 바꾸기
function chekAge(age) {
  return age > 18 ? true : confirm("보호자의 동의를 받으셨나요?");
}
```

```javascript
//'||'를 이용한 식으로 바꾸기
function chekAge(age) {
  return age > 18 || confirm("보호자의 동의를 받으셨나요?");
}
```

> return을 맨 앞에 한번에 적는 것이 효율적이다.  
> return age>18 이면 age>18이라는 사실에 대해 true 리턴임, 그 자체로 진실이니까.

2. pow(x,n) 함수 만들기
   > x의 n제곱을 반환해주는 함수, pow(x,n)를 만들어보세요. x의 n 제곱은 x를 n번 곱해서 만들 수 있습니다.  
   > 프롬프트 대화상자를 띄워 사용자로부터 x와 n을 입력받고 pow(x,n)의 반환 값을 보여주는 코드를 작성해 보세요.  
   > 주의사항: n은 1 이상의 자연수이어야 합니다. 이외의 경우엔 자연수를 입력하라는 얼럿 창을 띄워주어야 합니다.

```javascript
const button = confirm("x의 n제곱을 구해드립니다.");
if (button) {
  //사용자가 확인을 누르면 실행
  let x = prompt("x를 입력하세요");
  let n = prompt("n을 입력하세요");
  function pow(x, n) {
    return x ** n;
  }

  if (x >= 1) {
    alert(pow(x, n));
  } else {
    alert("`${n}은 자연수가 아닙니다. 자연수를 입력하세요!`");
  }
}
```

- 주의할 것은 `pow(x,y);`는 정말 딱 제곱수값만 도출해야 함! 그 이상을 하지 말 것

# 2.16 함수 표현식

> 자바스크립트에서 기본적으로 함수는 값이다.  
> 그러므로 일반적인 어떤 값처럼 할당, 복사, 선언할 수 있다.

## 함수 표현식

> 함수는 값처럼 변수에 대입하고, 복사할 수 있다

```javascript
//함수는 값처럼 변수에 대입할 수 있다. 함수를 이렇게 표현하는 것을 "함수표현식"이라고 한다.
let sayHi = function () {
  alert("Hello");
}; //변수의 대입이므로 마지막에 세미콜론 찍어줘야 함

//함수는 값처럼 복사할 수 있다.
let func = sayHi;

func(); //Hello
sayHi(); //Hello
```

## 콜백 함수

> 함수는 함수의 매개변수가 될 수 있다

```javascript
//일단 질문 받으면 대답해주는 함수 하나 선언함. 그러나 그 구체적인 내용에 들어가는 함수는 아직 선언되지 않음
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

//인자로 보낼 함수를 정의
//yes로 보내질 함수
function showOk() {
  //콜백함수
  alert("동의하셨습니다.");
}

//No로 보내질 함수
function showCancel() {
  //콜백함수
  alert("취소 버튼을 누르셨습니다.");
}

// 사용법: 함수 showOk와 showCancel가 ask 함수의 인수로 전달됨
ask("동의하십니까?", showOk, showCancel);
```

> 위의 코드는 아래의 코드와 같다

```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

//ask(question,yes,no)함수에 각각 값을 전하는건데 익명함수로 정의할 수도 있고, 위와 같이 각각의 함수를 정의해서 넣을 수도 있다.
ask(
  "동의하십니까?",
  function () {
    alert("동의하셨습니다.");
  },
  function () {
    alert("취소 버튼을 누르셨습니다.");
  }
);
```

- 우선 함수를 인자로 받는 함수를 추상적으로 쓴 후에 그 함수에 들어갈 함수를 정의하고, 정의된 함수를 인자로 보내는 식을 마지막에 씀으로서 첫번재 함수를 실행시킨다.
- 콜백함수는 다시 이전으로 불려진다는 의미에서 callback 함수이다.

## 함수 선언문과 함수 표현식의 차이

1. 문법 차이
2. 자바스크립트 엔진이 언제 함수를 생성하는가의 차이
   - 함수 선언문은 자바스크립트 실행 준비 단계에서 생성되어 어디서든 접근 가능하다.
   - 함수 표현식은 실행 흐름이 표현식에 다다라야 만들어져서 함수 선언 이후에야 접근 가능하다
3. 스코프의 차이

   - 함수 선언문은 함수1 내부에 선언된 함수2에 대해 함수1 밖에서는 접근할 수 없다

   ```javascript
   let age = 16; // 16을 저장했다 가정합시다.

   if (age < 18) {
     welcome();
     function welcome() {
       alert("안녕!");
     }
     welcome();
   } else {
     function wlecome() {
       alert("안녕하세요");
     }
   }
   // 여기는 중괄호 밖이기 때문에
   // 중괄호 안에서 선언한 함수 선언문은 호출할 수 없습니다.

   welcome(); // Error: welcome is not defined
   ```

   - 함수 표현식은 함수1 내부에 표현식으로 함수2를 작성하므로, 단순 변수같은 느낌이라 함수 밖에서도 접근할 수 있다.

   ```javascript
   let age = prompt("나이를 알려주세요.", 18);
   let welcome;

   if (age < 18) {
     welcome = function () {
       alert("안녕!");
     };
   } else {
     welcome = function () {
       lert("안녕하세요!");
     };
   }

   welcome(); // 제대로 동작합니다.
   ```

## 결론

- 기본적으로는 함수 선언식은 함수가 선언되기 이전에도 쓸 수 있고 가독성이 좋으므로 디폴트로 쓴다
- 함수 선언식이 부적절 한 경우에 함수 표현식을 사용

# 2.17 화살표 함수 기본

> 문법이 눈에 익기 시작하면 적응 잘됨  
> 본문이 짧은 함수에 유리  
> 본문이 여러줄이라면 화살표 뒤에 {} 써야함

1. 기본꼴 : `let 함수명 = (arg1, arg2, arg3 ....) => expression;`

```javascript
let sum = (a, b) => a + b;

/* 위 화살표 함수는 아래 함수의 축약 버전입니다.

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

```javascript
//argument 없을 때엔 괄호 필수지만, 인자 하나일 땐 생략 가능
let sayHi = () => alert("안녕하세요!");
sayHi();
```

```javascript
let age = prompt("나이를 알려주세요.", 18);

//두가지 결과값 있을 수 있으므로 이렇게 동적으로도 만들 수 있음
let welcome = age < 18 ? () => alert("안녕") : () => alert("안녕하세요!");

welcome();
```

2. 코드가 여러줄인 경우

```javascript
let sum = (a, b) => {
  // 중괄호는 본문 여러 줄로 구성되어 있음을 알려줍니다.
  let result = a + b;
  return result; // 중괄호를 사용했다면, return 지시자로 결괏값을 반환해주어야 합니다.(한줄짜리에선 안써줘도 됨)
};

alert(sum(1, 2)); // 3
```

## 과제

1. 아래 함수 화살표 함수로 변경하기

```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "동의하십니까?",
  function () {
    alert("동의하셨습니다.");
  },
  function () {
    alert("취소 버튼을 누르셨습니다.");
  }
);
```

```javascript
let ask = (question, yes, no) => {
  if (confirm(question)) yes();
  else no();
};

ask(
  "동의하십니까?",
  //화살표 함수를 굳이 let 변수에 대입할 필욘 없다. 익명함수 그대로 냅둬도 됨!
  () => alert("동의하셨습니다."),
  () => alert("취소 버튼을 누르셨습니다.")
);
```
