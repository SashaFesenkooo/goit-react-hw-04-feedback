import React, {useState } from "react";
import { Notification } from "components/notification/Notification";
import { FeedbackOptions } from "./feedbackOptions/FeedbackOptions";
import { Section } from "./section/Section";
import { Statistics } from "./statistics/Statistics";


export const App = () => {
  
  const [good, setGoog] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const baseArray = ['good', 'neutral', 'bad']
  const valueArray = [good, neutral, bad]


 const hadleIncrement = (evt) => {
   const { name } = evt.target

   switch (name) {
     case "good":
       setGoog(good + 1)
       break;
     case "neutral":
       setNeutral(neutral + 1)
       break;
     case "bad":
       setBad(bad + 1)
       break;
           
     default:
       return
   }
  }

  const countTotalFeedback = () => {
    return valueArray.reduce((acc, item) => { return acc + item }, 0)
  }


  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  }

  return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={baseArray}
            onLeaveFeedback={hadleIncrement} />
        </Section>

        <Section title="Statistics">
          {good === 0 && neutral === 0 && bad === 0 ?
            <Notification message="There is no feedback" /> :
            <Statistics good={good} neutral={neutral}
              bad={bad} total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          } 
        </Section>
      </>
  )
}
