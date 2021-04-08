function solution(numbers) {
    var answer = [];
    let count = 0;
    let i, j;
    //1. 모든 인덱스에 접근 첫번째 하나 가져다가 2,3,4,5,...n 번째 접근
    //2. 가져온 애들끼리 더해서 새로운 배열 answer에 넣기


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






