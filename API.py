from flask import Flask, jsonify, request
import json

app = Flask(__name__)
from datetime import date

today = date.today()
# dd/mm/YY
date_today = today.strftime("%d/%m/%Y")

# template
# assignments = {
# "CourseCode" : {"assignmentTitle": "Title", "Assignment Via": "Blackboard/Canvas", "Due": DD/MM/YYYY, userPosted: "Username"}
# }
class_assignments = {
    "CSCI136-02": [{"title": "In Order Traversals", "Assignment Via": "Blackboard", "Due": "28/11/2022",
                    "userPosted": "Jabezzy00"}],
    "CSCI101-01": [{"title": "Wordle Game", "Assignment Via": "Canvas", "Due": "08/12/2022", "userPosted": "Phinny"}]
}


@app.get('/')
def list_assignments():
    return_lst = []
    for assignment in class_assignments:
        lst = class_assignments[assignment]
        for sub_lst in lst:
            return_lst.append(sub_lst)
    return {"class_assignments": return_lst}


@app.get('/class_assignments_due/<course_code>')
def list_class_assignments(course_code):  # returns assignments due today
    return_lst = []
    assignment_list = class_assignments[course_code]
    for assignment in assignment_list:
        if assignment["Due"] == date_today:
            return_lst.append(assignment)

    return {"class assignments due today ": return_lst}


@app.route('/class_assignments/<course_code>')
def get_all_assignments(course_code):
    lst = class_assignments[course_code]
    return lst


@app.route("/add_assignment", methods=['POST'])
def addAssignment(course_code, title, submission_via, due_date, user):
    if course_code.upper() in class_assignments:
        # do
        lst_of_assignments = class_assignments[course_code]
        # to avoid replicas, we check if there has already been an assignment titled the same way
        for i in lst_of_assignments:
            if sorted(title.lower().split()) == sorted(i["Due"].lower().split()):
                return "assignment already been uploaded"
        # at this point, if still running, then assignment hasnt already been uploaded
        template = lst_of_assignments[0]
        template["Due"] = due_date
        template["title"] = title
        template["Assignment Via"] = submission_via
        class_assignments[course_code].append(template)
        return "Executed Successfully"

    else:
        return "Error: An Error has occured. Course not in registered Classes"


app.run(host='0.0.0.0')