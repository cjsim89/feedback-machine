# feedback-machine

The process of grading & giving feedback to M1 projects could be easier. So, I wrote some shitty front-end code to do this.

## Alpha
- [x] Ability to grade the first BE M1 project easier by clicking on the appropriate Rubric scores, and typing pertinent feedback.
- [ ] Ability to handle half-grades (a score of #.5 should not pull any feedback automatically)
- [x] Ability to generate feedback comprised with Rubric benchmark + instructor's custom feedback, along with the student's name, average, and each category score.
- [ ] Ability to copy generated feedback for manually pasting into a Slack DM.
- [ ] Ability to generate clickable Rubric markup from JSON file, manually generated from existing Project spec in BE curriculum

## Beta
All features of alpha, including:
- [ ] Ability to automatically generate a clickable Rubric from a JSON file

## Full Spec
All features of Beta, including:
- [ ] Ability to create & save a new project with rubric, description, URL to existing GH project, passing score/average threshold
- [ ] Ability to integrate with Slack to automatically send and/or schedule messages
- [ ] Ability to save & view project scores per-cohort
- [ ] Ability to paste and clone a student repo from GH, load project repo to an in-browser editor, and run code including tests & harnesses

# How to Run
Open `index.html` in your browser.
Click on the text of each rubric score to assign that score's feedback to the project. If you want to assign a half-value to a category, use the Up/Down arrows or type it in each box.
Fill out any custom feedback per category, fill out the student's name, and click `Generate`.
Your Instructor Feedback will be populated at the bottom of the page.