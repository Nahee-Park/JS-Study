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


