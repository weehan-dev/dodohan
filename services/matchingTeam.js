/* 
DB에서 객체 가져오기 but 오류나서 하지 못함 
*/

// const Participant = require("../models/schema/participants.schema");
// const Team = require("../models/schema/teams.schema");
// var M3 = Team.find(
//   { gender: "male", matchingType: 3 },
//   {
//     gender: false,
//     school: false,
//     preferAge: true,
//     leader: true,
//     matchingType: false,
//     members: false,
//     isMatched: false,
//     partnerTeam: true,
//     avgAge: false,
//     teamPoint: true
//   }
// );

// var F3 = Team.find(
//   { gender: "female", matchingType: 3 },
//   {
//     gender: false,
//     school: false,
//     preferAge: true,
//     leader: true,
//     matchingType: false,
//     members: false,
//     isMatched: true,
//     partnerTeam: true,
//     avgAge: false,
//     teamPoint: ture
//   }
// );

/* 
테스트 케이스 
*/
// var Male = [
//   {
//     kakaoId: "a",
//     point: 20,
//     prefer_age: [20, 21, 22],
//     age: [20, 21]
//   },
//   {
//     kakaoId: "b",
//     point: 30,
//     prefer_age: [24, 25],
//     age: [24, 25]
//   },
//   {
//     kakaoId: "c",
//     point: 10,
//     prefer_age: [20, 21, 22, 23, 24, 25],
//     age: [26]
//   }
// ];

// var Female = [
//   {
//     kakaoId: "d",
//     point: 30,
//     prefer_age: [20, 21],
//     age: [20]
//   },
//   {
//     kakaoId: "e",
//     point: 10,
//     prefer_age: [20, 21, 22, 23, 24, 25, 26],
//     age: [23, 24, 25]
//   },
//   {
//     kakaoId: "f",
//     point: 20,
//     prefer_age: [22, 23, 24, 25],
//     age: [25]
//   }
// ];

//Point 값을 기준으로 오름차순 정렬
export const sortByPriority = arr => {
  arr.sort((a, b) => {
    return a["point"] - b["point"];
  });
  return arr;
};

//선호 나이대에 맞는 매칭 후보 맵핑
export const setCandidate = (x, y) => {
  var people = [];

  for (var i = 0; i < x.length; i++) {
    var person = {};
    var kakaoId = x[i]["kakaoId"];
    var candidates = [];

    for (var j = 0; j < y.length; j++) {
      var tf = y[j]["age"].every(element => {
        return x[i]["prefer_age"].includes(element);
      });
      if (tf) {
        candidates.push(y[j]["kakaoId"]);
      }
    }
    person.kakaoId = kakaoId;
    person.candidates = candidates;
    people.push(person);
  }
  return people;
};

// 각 남녀의 선호 이성 리스트
export const findCandidates = (preferList, com) => {
  for (key in preferList) {
    if (preferList[key]["kakaoId"] === com) {
      var prefer = preferList[key]["candidates"];
    }
  }
  return prefer;
};

// 여자와 이미 매칭된 남자 찾기
export const findcurrMan = map => {
  if ([...map.entries()] == false) {
    return null;
  } else {
    return [...map.entries()][0][0];
  }
};

/* 매칭 알고리즘 */
export const match = (malePrefer, femalePrefer) => {
  var engaged = new Map(); //[[man, woman]]의 map 형식
  const notMatchedMale = malePrefer.map(obj => obj["kakaoId"]);

  while (!(notMatchedMale == "")) {
    var man = notMatchedMale.pop();
    var manPreferList = findCandidates(malePrefer, man);
    var woman = manPreferList.pop();
    var womanPreferList = findCandidates(femalePrefer, woman);

    var findMap = new Map([...engaged].filter(([m, w]) => w === woman));
    var currMan = findcurrMan(findMap);

    if (!currMan) {
      if (womanPreferList.includes(man)) {
        engaged.set(man, woman);
        //console.log(`${man}과 ${woman}이 매칭되었습니다. ${engaged}`);
      } else {
        if (manPreferList) {
          notMatchedMale.push(man);
        }
      }
    } else {
      if (womanPreferList.includes(man)) {
        if (womanPreferList.indexOf(currMan) > womanPreferList.indexOf(man)) {
          engaged.set(man, woman);
          var currManPreferList = findCandidates(malePrefer, currMan);
          if (currManPreferList) {
            notMatchedMale.push(currMan);
          }
        } else {
          if (manPreferList) {
            notMatchedMale.push(man);
          }
        }
      } else {
        if (manPreferList) {
          notMatchedMale.push(man);
          //   console.log(
          //     `${man}이 ${currMan}이 있는 ${woman}한테 차이고 다시 대기`
          //   );
        }
      }
    }
    //console.log("========");
  }
  return engaged;
};

// 일단 여기 썼으요

sortByPriority(Male);
sortByPriority(Female);

const malePrefer = setCandidate(Male, Female);
const femalePrefer = setCandidate(Female, Male);

const matchingResult = match(malePrefer, femalePrefer);

console.log(matchingResult);
