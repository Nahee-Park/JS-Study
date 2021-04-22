// *문제 설명*
// - 정수 배열 numbers가 주어집니다. numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.

// *제한사항*
// - numbers의 길이는 2 이상 100 이하입니다.
// - numbers의 모든 수는 0 이상 100 이하입니다.

//*풀이 방법*
//1. 배열 첫번째 하나 가져다가 2,3,4,5,...n 번째 접근하면서 더하기
//2. 그 중 중복되지 않는 애들 answer배열에 넣기
//3. answer 배열 버블 정렬

function solution(numbers) {
    var answer = [];
    let count = 0;
    let i, j;



    for(i=0;i<numbers.length;i++){
        for(j=i+1;j<numbers.length;j++){
            let element =numbers[i]+numbers[j];
            if(!answer.includes(element)){
                answer.push(element);
            }
            count++;
        }
    }
    for(i=count;i>0;i--){
        for(j=0;j<i-1;j++){
            if(answer[j+1]<answer[j]){
                let temp = answer[j+1];
                answer[j+1]=answer[j];
                answer[j] = temp;
            }
        }
    }
    return answer;
}

let answer = solution([4,2,6,4,3]);
console.log(`따라서 [${answer}을] return해야 합니다.`);






