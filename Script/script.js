const questions = [
    {
        title: "Who stared as The Man with No Name in the Spaghetti Western movies?",
        choices: ["Clint Eastwood", "John Wayne", "Charles Bronson", "Kurt Russell"],
        answer: "Clint Eastwood"
    },
    {
        title: "What movie is about the famous Wyatt Earp?",
        choices: ["Gremlins", "Tombstone", "Wyatt Earp", "Wichita"],
        answer: "Tombstone"
    },
    {
        title: "Who wrote the famous score for The Good, The Bad and The Ugly?",
        choices: ["Elmer Bernstein", "Henry Mancini", "Ennio Morricone", "John Williams"],
        answer: "Ennio Morricone"
    },
    {
        title: "Which 2008 western starred Ed Harris and Viggo Mortensen?",
        choices: ["True Grit", "3:10 to Yuma", "Bone Tomahawk", "Appaloosa"],
        answer: "Appaloosa"
    },
    {
        title: "Which movie did Ennio Morricone win an oscar for best score?",
        choices: ["The Good, The Bad, and The Ugly", "A Fist Full of Dollars", "Once Upon A Time In The West", "The Hateful Eight"],
        answer: "The Hateful Eight"
    }
];
document.addEventListener('DOMContentLoaded', (event) => {

    // LET's set our variables here

    const initialTime = 60;
    let time = 60;
    let score = 0;
    let timer;
    let q = 0;
    let answers = document.querySelectorAll('#quizContainer button');

    let recordsArray = [];
    // Grab the data if it exists
    (localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')) : recordsArray = [];

    // All the FUNctions
    let queryElement = (element) => {
        return document.querySelector(element);
    };

    let onlyDisplaySection = (element) => {
        let sections = document.querySelectorAll("section");
        Array.from(sections).forEach((userItem) => {
            userItem.classList.add('hide');
        });
        queryElement(element).classList.remove('hide');
    };

    let setQuestionData = () => {
        queryElement('#quizContainer p').innerHTML = questions[q].title;
        queryElement('#quizContainer button:nth-of-type(1)').innerHTML = `1. ${questions[q].choices[0]}`;
        queryElement('#quizContainer button:nth-of-type(2)').innerHTML = `2. ${questions[q].choices[1]}`;
        queryElement('#quizContainer button:nth-of-type(3)').innerHTML = `3. ${questions[q].choices[2]}`;
        queryElement('#quizContainer button:nth-of-type(4)').innerHTML = `4. ${questions[q].choices[3]}`;
    };

    let quizUpdate = (answerCopy) => {
        queryElement('#scoreIndicator p').innerHTML = answerCopy;
        queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
        Array.from(answers).forEach(answer => {
            answer.classList.add('disable');
        });

        setTimeout(() => {
            if (q === questions.length) {
                onlyDisplaySection("#finish");
                time = 0;
                queryElement('#time').innerHTML = time;
            } else {
                setQuestionData();
                Array.from(answers).forEach(answer => {
                    answer.classList.remove('disable');
                });
            }
        }, 1000);
    };

    let myTimer = () => {
        if (time > 0) {
            time = time - 1;
            queryElement('#time').innerHTML = time;
        } else {
            clearInterval(clock);
            queryElement('#score').innerHTML = score;
            onlyDisplaySection("#finish");
        }
    };

    let clock;
    queryElement("#intro button").addEventListener("click", (e) => {
        //call above function to set Initial data in questionHolder section
        setQuestionData();
        onlyDisplaySection("#quizContainer");
        clock = setInterval(myTimer, 1000);
    });

    let scoreIndicator = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            queryElement('#scoreIndicator').classList.add('invisible');
        }, 1000);
    };

    //////////////////// QUIZ CONTROLS ////////////////////

    Array.from(answers).forEach(check => {
        check.addEventListener('click', function (event) {
            // Handles events if a question is answered correctly
            if (this.innerHTML.substring(3, this.length) === questions[q].answer) {
                score = score + 1;
                q = q + 1;
                quizUpdate("Yeppers. You got that one right!");
            } else {
                q = q + 1;
                quizUpdate("Nooope.  That's just WRONG!");
            }
        });
    });

    // Submit The Score

    queryElement("#records button").addEventListener("click", () => {
        let initialsRecord = queryElement('#initials').value;
        recordsArray.push({
            "initialRecord": initialsRecord,
            "score": score
        });
        localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
        queryElement('#highScores div').innerHTML = '';
        onlyDisplaySection("#highScores");
        recordsHtmlReset();
        queryElement("#initials").value = '';
    });

    // Nuke the High Scores
    queryElement("#clearScores").addEventListener("click", () => {
        recordsArray = [];
        queryElement('#highScores div').innerHTML = "";
        localStorage.removeItem('recordsArray');
    });

    // Completely reset the entire quiz
    queryElement("#reset").addEventListener("click", () => {
        time = initialTime;
        score = 0;
        q = 0;
        onlyDisplaySection("#intro");
    });

    let recordsHtmlReset = () => {
        queryElement('#highScores div').innerHTML = "";
        let i = 1;
        recordsArray.sort((a, b) => b.score - a.score);
        Array.from(recordsArray).forEach(check => {
            const scores = document.createElement("div");
            scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
            queryElement('#highScores div').appendChild(scores);
            i = i + 1
        });
        i = 0;
        Array.from(answers).forEach(answer => {
            answer.classList.remove('disable');
        });
    }
    queryElement("#scores").addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(clock);
        queryElement('#time').innerHTML = 0;
        time = initialTime;
        score = 0;
        qCount = 0;
        onlyDisplaySection("#highScores");
        recordsHtmlReset();
    });
});