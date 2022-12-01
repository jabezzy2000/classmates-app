from flask import Flask, jsonify, request
import json

app = Flask(__name__)
from datetime import date

today = date.today()
# YY/mm/dd
date_today = today.strftime("%Y-%m-%d")
lst_today = date_today.split("-")
#2022-12-08

# template assignments = { "CourseCode" : {"assignmentTitle": "Title", "Assignment Via": "Blackboard/Canvas",
# "Due": DD/MM/YYYY, userPosted: "Username"} }
class_assignments = {
    "CSCI136-02": [{"title": "In Order Traversals", "Assignment Via": "Blackboard", "Due": "2022/11/28",
                    "userPosted": "Jabezzy00"},
                   {"title": "Pre Order Traversals", "Assignment Via": "Blackboard", "Due": "2022/11/29",
                    "userPosted": "Loren"}],
    "CSCI101-01": [{"title": "Wordle Game", "Assignment Via": "Canvas", "Due": "08/12/2022", "userPosted": "Phinny"}],
    "MATH101-01": [
        {"title": "Differentiation", "Assignment Via": "Blackboard", "Due": "2022/11/28", "userPosted": "Donald"}],
    "ENGW102-03": [{"title": "Racist Essay", "Assignment Via": "Canvas", "Due": "2022/11/29", "userPosted": "Kofi"}]

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


@app.get('/class_assignments_due_everyday/<datetoday>')
def list_class_assignments_today(datetoday):  # returns assignments due today
    return_dic = {datetoday: []}
    return_lst = []
    try:
        for individualClass in class_assignments:
            all_assignments = class_assignments[individualClass]
            for each_assignment in all_assignments:
                datetoday_lst = datetoday.split("-")
                lst_assignment_date = each_assignment["Due"].split("/")
                if lst_assignment_date == datetoday_lst:
                    return_lst.append(each_assignment)
        return {datetoday: return_lst}
    except:
        return "An error occurred on the server"
    # return_dic[dateToday] = return_lst
    # return return_dic


# {2022/10/10 : [{"title": "In Order Traversals", "Assignment Via": "Blackboard", "Due": "28/11/2022","userPosted": "Jabezzy00"},
#               {"title": "Pre Order Traversals", "Assignment Via": "Blackboard", "Due": "29/11/2022","userPosted": "Loren"}


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
        return "Error: An Error has occurred. Course not in registered Classes"


app.run(host='0.0.0.0')
