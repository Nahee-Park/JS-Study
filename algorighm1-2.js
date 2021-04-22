// 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.

// 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다.
// (1은 소수가 아닙니다.)

// 제한 조건
// n은 2이상 1000000이하의 자연수입니다.


//1. 2부터 n까지 하나하나 소수인지 점검
//2. 나머지가 0인 수가 나오는 순간 걔는 소수가 아니므로 다시 for문으로 가서 다음 수 점검
//3. continue문 영향 받지 않고 내려가서 수행되면 소수이므로 answer++

function solution(n) {
    var answer = 0;
    next: for(let i=2;i<=n;i++){
        for(let j=2;j<i;j++){
            if(i%j==0){
                continue next;
            }
        }
        answer++;
    }
    return answer;
}

//--->효율성 개쓰레기임 .. 그렇겠지 O(n^2)일태니 ^^..

//에라토스테네스의 체 이용 -> 소수의 배수들을 제거하고 남은 애들이 소수
//기본적으로 1 대입, 소수가 아닌 것들을 0으로 바꾸기 (소수의 배수들 0으로 바꾸기)
function solution(n){
    var answer;
    let prime = new Array(n);
    prime.fill(1);
    prime[0]=0;
    for(let i=2;i**2<=n;i++){
        if(prime[i-1]==1){
            for(let j = i**2;j<=n;j=j+i){// j는 i의 제곱수들을 n까지 점검하며 0으로 챠움 
                prime[j-1]=0;
            }
        }
    }
    answer = prime.filter(function(e){
        return e==1;
    }).length;
    
    return answer;
}

filter(() = e =>e==1)