"/* Style the game container */
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

/* Style for the score display */
#score-display {
    font-size: 24px;
    margin-bottom: 20px;
    font-family: 'Comic Sans MS', Arial, sans-serif;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #ffa500;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Style for the dropdown (select element) */
select {
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffd700;
    color: #333;
    border: 2px solid #ffa500;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

select:hover {
    background-color: #ffdf00;
    border-color: #ff8c00;
}

select:focus {
    border-color: #ff4500;
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
}

/* Style the dropdown label */
label {
    font-family: 'Comic Sans MS', Arial, sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
}

/* Style the card container */
.card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    width: 100%;
    max-width: 600px; /* Set a maximum width to keep cards contained */
}

/* Style for the cards */
.card {
    width: 100px;
    height: 100px;
    background-color: #ffd700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: 'Comic Sans MS', Arial, sans-serif;
    color: #333;
    border-radius: 10px;
    border: 2px solid #ffa500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    perspective: 1000px; /* Needed for 3D flip */
}

.card.matched {
    background-color: #32cd32;
    color: #fff;
}

/* Card inner for flip effect */
.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.is-flipped {
    transform: rotateY(180deg);
}

/* Front and back faces of the card */
.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.card-back {
    background-color: #ffd700;
    transform: rotateY(180deg);
}

/* Style for the start game button */
#start-button {
    font-size: 18px;
    padding: 15px 30px;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#start-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

#start-button:hover {
    background-color: #ff6347;
}

/* Style for the progress bar */
.progress-container {
    width: 100%;
    max-width: 600px;
    height: 20px;
    background-color: #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
}

#progress-bar {
    height: 100%;
    background-color: #32cd32;
    width: 0;
    transition: width 0.4s ease;
}

/* Set complete message */
.completion-message {
    font-size: 24px;
    color: #32cd32;
    text-align: center;
    margin-top: 20px;
}"
