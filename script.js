const Btn = document.querySelector(".btn");
// getting getting scores
const EngishScore = document.querySelector("#engscore");
const MathematicsScore = document.querySelector("#mathscore");
const BiologyScore = document.querySelector("#bioscore");
const ChemistryScore = document.querySelector("#chemscore");
const ComputerScore = document.querySelector("#compscore");
const Username = document.querySelector("#username");
const TotalScoreOutPut = document.querySelector("#totalscoreoutput");
const UserUsername = Username.value;

//adding event listener on the button to calculate and triger the result
Btn.addEventListener("click", () => {
  if (
    EngishScore.value &&
    MathematicsScore.value &&
    BiologyScore.value &&
    ChemistryScore.value &&
    ComputerScore.value &&
    Username.value != " "
  ) {
    const EgValue = EngishScore.value;
    const MathValue = MathematicsScore.value;
    const BiValue = BiologyScore.value;
    const ChemValue = ChemistryScore.value;
    const CompValue = ComputerScore.value;
    const TotalScore =
      Number(EgValue) +
      Number(MathValue) +
      Number(BiValue) +
      Number(ChemValue) +
      Number(CompValue);

    const Alert = document.querySelector(".alert");
    Alert.style.display = "flex";
    let Text = `${UserUsername} Your total score is ${TotalScore}`;
    const Message = document.querySelector("#message");
    Message.innerText = Text;
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const Notificaiton = new Notification(`${UserUsername}`, {
          body: `Your total score is ${TotalScore}`,
          data: { score: `${TotalScore}` },
          icon: "notificaitonlogo.png",
          tag: "Total score",
        });
        // adding event listenere on the notificaiotn bar
        // Notificaiton.addEventListener("click", () => {
        //   Notificaiton.close();
        // });
      }
    });
  } else {
    const Message = document.querySelector("#message");
    const Alert = document.querySelector(".alert");
    Alert.style.display = "flex";

    Message.innerText = "Please fill the form properly";
  }
});

let looseFocusNotification;
let interval;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const onFocusedTime = new Date();
   interval = setInterval(() => {
      looseFocusNotification = new Notification(
        "You Can click on this notificaiton to finish checking checking your score",
        {
          body: `${UserUsername} Your have been gone for ${Math.round(
            (new Date() - onFocusedTime) / 1000
          )} seconds, You can go back to finish your operation`,
          tag: "undo operation",
        }
      );
    }, 100);
  } else {
   if(interval) clearInterval(interval);
   if(looseFocusNotification) looseFocusNotification.close();
    
  }
});
