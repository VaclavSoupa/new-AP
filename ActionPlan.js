//Few global varialbles get from surveys
var CreateActionButton = document.getElementById("CreateActionButton");
var AddCommentButton = document.getElementById("AddBtn");
var JSONstorage = document.getElementById("JSONstorage");
var JSONstorageActions = document.getElementById("JSONstorageActions");
var SaveActions = document.getElementById("SaveActions");
var JSONstorageDetails = document.getElementById("JSONstorageDetails");
var StatusDropdownFromConfirmit = document.getElementById("StatusDropDown");
var StatusDropdown = document.getElementById("StatusDropdown");
var ImportanceDropdown = document.getElementById("ImportanceDropdown");
var DueDate = document.getElementById("DueDate");
var DIM_id = document.getElementById("DIM_id");
var user = document.getElementById("user_id");
var statusModalOpener = document.getElementById("statusModalOpener");
var userRole = document.getElementById("UserRole_id");
var Questions = document.getElementById("Questions");
var JSONstorageSuggestedStorage = document.getElementById("JSONstorageSuggestedActions");
var AddNewQuestion = document.getElementById("AddNewQuestion");
var notesInput = document.getElementById("NotesInput");
var costInput = document.getElementById("CostInput");


//hide all unnecessary elements that are only used in a background
document.getElementById("fieldset_UserRole_id").style.display = "none";
document.getElementById("fieldset_DIM_id").style.display = "none";
document.getElementById("fieldset_user_id").style.display = "none";
document.getElementById("fieldset_Stopper").style.display = "none";
document.getElementById("fieldset_JSONstorage").style.display = "none";
document.getElementById("fieldset_JSONstorageActions").style.display = "none";
document.getElementById("fieldset_JSONstorageDetails").style.display = "none";
document.getElementById("fieldset_JSONstorageSuggestedActions").style.display = "none";
document.getElementById("fieldset_Questions").style.display = "none";
document.getElementById("fieldset_StatusDropDown").style.display = "none";
document.getElementById("fieldset_DefaultActions").style.display = "none";
document.getElementById("fieldset_Dimensions").style.display = "none";
document.getElementById("fieldset_Dimensions").style.display = "none";
/*
document.getElementById("fieldset_Orgcode").style.display = "none";
document.getElementById("fieldset_Gender").style.display = "none";
document.getElementById("fieldset_Region").style.display = "none";*/


//Initialize all objects on background in openText used as JSONstorage
if (JSONstorageActions.value === '') {

  var WrapperForActions = {
    Actions: []
  };
} else {
  var WrapperForActions = JSON.parse(JSONstorageActions.value);
}

if (JSONstorageDetails.value === '') {
  var ActionDetails = {
    PlanName: "Name",
    StatusOption: 0,
    statusModalOpenerColor: "",
    statusModalOpenerdisabled: true,
    progressInput: 0,
    Relatable: [],
    Date: '',
    Owner: user.value,
    Unit: "overAll",
    Importance: 0,
    Cost: costInput.value,
    Notes: notesInput.value
  }
  JSONstorageDetails.value = (JSON.stringify(ActionDetails));
} else {
  var ActionDetails = JSON.parse(JSONstorageDetails.value);
}

if (JSONstorage.value === '') {
  var Wrapper = {
    Comments: []
  };
} else {
  var Wrapper = JSON.parse(JSONstorage.value);
}

//Everytime any button is pushed this function generates whole page based on JSONstorage objects
window.onload = function() {
  AddCommentButton.disabled = true;

  generateComments();
  generateActions();
  genarateDetails();
  createSAobject();
  generateSuggestedActions();
}
//Function for disabling all modal windows
window.onclick = function(event) {
  var statusModal = document.getElementById("statusModal");
  if (event.target == statusModal) {
    statusModal.style.display = "none";
  }

  var modalQuestionsDropdown = document.getElementById("QuestionsDropdown");
  if (event.target == modalQuestionsDropdown) {
    modalQuestionsDropdown.style.display = "none";
  }

  for (var i = 0; i < WrapperForActions.Actions.length; i++) {
    var modal = document.getElementById(WrapperForActions.Actions[i].ModalWindowID);
    if (event.target.id == WrapperForActions.Actions[i].ModalWindowID) {
      modal.style.display = "none";
    }
  }
}



//Event on add button, create new
AddCommentButton.onclick = function() {
  var AddCommentValue = document.getElementById("Comment").value;
  var ButtonId = Math.random().toString(36).substr(2, 9);
  var Comment = {
    CommentValue: AddCommentValue,
    ButtonID: ButtonId
  };

  Wrapper.Comments.push(Comment);
  JSONstorage.value = (JSON.stringify(Wrapper));
}

CreateActionButton.onclick = function() {
  var RemoveActionButtonId = Math.random().toString(36).substr(2, 9);
  var ActionNameID = Math.random().toString(36).substr(2, 9);
  var ActionDetailsID = Math.random().toString(36).substr(2, 9);
  var ActionDateID = Math.random().toString(36).substr(2, 9);
  var ActionOwnerID = Math.random().toString(36).substr(2, 9);
  var DropdownOption = Math.random().toString(36).substr(2, 9);
  var ActionProgressID = Math.random().toString(36).substr(2, 9);
  var OpenModalButtonID = Math.random().toString(36).substr(2, 9);
  var ModalID = Math.random().toString(36).substr(2, 9);
  var MyProgressID = Math.random().toString(36).substr(2, 9);
  var MyBarID = Math.random().toString(36).substr(2, 9);
  var Action = {
    showModal: "none",
    OpenModalButton: "Not started",
    OpenModalButtonID: OpenModalButtonID,
    DropdownOption: 0,
    DropdownID: DropdownOption,
    ActionProgress: 0,
    ActionProgressDisabled: true,
    ActionProgressID: ActionProgressID,
    ActionProgressColor: "grey",
    ActionName: "",
    ActionNameID: ActionNameID,
    ActionDetails: "",
    ActionDetailsID: ActionDetailsID,
    ActionDate: "",
    ActionDateID: ActionDateID,
    ActionOwner: user.value,
    ActionOwnerID: ActionOwnerID,
    ActionID: RemoveActionButtonId,
    ModalWindowID: ModalID,
    MyProgressID: MyProgressID,
    MyBarID: MyBarID,
    removedIndex: -1
  };
  WrapperForActions.Actions.push(Action);
  JSONstorageActions.value = (JSON.stringify(WrapperForActions));
}

var AddCommentValue = document.getElementById("Comment");
AddCommentValue.oninput = function() {
  if (this.value === "") {
    AddCommentButton.disabled = true;
  } else {
    AddCommentButton.disabled = false;
  }
}

function removeComment(clicked_id, Wrapper) {
  for (var i = 0; i < Wrapper.Comments.length; i++) {
    if (Wrapper.Comments[i].ButtonID == clicked_id) {
      Wrapper.Comments.splice(i, 1);
      JSONstorage.value = (JSON.stringify(Wrapper));
    }
  }
}

function removeAction(clicked_id, WrapperForActions) {
  console.log("Event");
  var JSONstorageSuggestedActions = document.getElementById("JSONstorageSuggestedActions");
  var objectSA = JSON.parse(JSONstorageSuggestedActions.value);

  for (var l = 0; l < WrapperForActions.Actions.length; l++) {
    if (WrapperForActions.Actions[l].ActionID == clicked_id) {
      if (WrapperForActions.Actions[l].removedIndex == -1) {
        WrapperForActions.Actions.splice(l, 1);
        console.log("if");
        JSONstorageActions.value = (JSON.stringify(WrapperForActions));
        console.log("if");
      } else {
        console.log(objectSA.SuggestedStorage.length);
        for (var u = 0; u < objectSA.SuggestedStorage.length; u++) {
          console.log("for");
          if (u == WrapperForActions.Actions[l].removedIndex) {
            console.log("if");
            objectSA.SuggestedStorage[u].Show = "block";
            JSONstorageSuggestedActions.value = JSON.stringify(objectSA);
          }
        }

        WrapperForActions.Actions.splice(l, 1);
        JSONstorageActions.value = (JSON.stringify(WrapperForActions));
      }
    }
  }
}
///////////////////////////////////////////////////////////GENERATE Comments
function generateComments() {
  var CommentDIV = document.getElementById("CommentDIV");
  CommentDIV.className="CommentDIV";
  if (!Wrapper.Comments.length == 0) {
    for (var i = 0; i < Wrapper.Comments.length; i++) {

      var div = document.createElement("DIV");
      div.className = "row";

      var divForLabel = document.createElement("DIV");
      divForLabel.className = "column";

      var divForButton = document.createElement("DIV");
      divForButton.className = "column";

      var CommentLabel = document.createElement("LABEL");
      CommentLabel.innerHTML = Wrapper.Comments[i].CommentValue;
   CommentLabel.className="CommentLabel";

      var RemoveButton = document.createElement("Button");
      RemoveButton.className="RemoveCommentButton";
      RemoveButton.innerHTML = "Remove";
      RemoveButton.id = Wrapper.Comments[i].ButtonID;
      RemoveButton.addEventListener("click", function() {
        var x = event.target.id;
        removeComment(x, Wrapper);
      })

      divForLabel.appendChild(CommentLabel);
      divForButton.appendChild(RemoveButton);

      div.appendChild(divForLabel);
      div.appendChild(divForButton);

      CommentDIV.appendChild(div);
    }
  }
}

function getDimensioName() {
  var DIM_id = document.getElementById("DIM_id");
  var Dimensions = document.getElementById("Dimensions");
  for (var j = 0; j < Dimensions.options.length; j++) {
    if (DIM_id.innerHTML == Dimensions.options[j].value) {
      var DimensionText = Dimensions.options[j].text;
      return DimensionText;
    }
  }
}

function createSAobject() {
  var JSONstorageSuggestedStorage = document.getElementById("JSONstorageSuggestedActions");

  if (JSONstorageSuggestedStorage.value == "") {
    var Dimensions = document.getElementById("Dimensions");
    var DefaultActions = document.getElementById("DefaultActions");
    var DIM_id = document.getElementById("DIM_id");
    var WrraperForSA = [];
    var actionsOptions = DefaultActions.options.length;
    if (DIM_id.value == "") {

      actionsOptions = 0;
      JSONstorageSuggestedStorage.value = '{"SuggestedStorage":' + JSON.stringify(WrraperForSA) + "}";
    }
    for (var i = 0; i < actionsOptions; i++) {
      if (!(DefaultActions.options[i].value.search(DIM_id.innerHTML) == -1)) {
        var SuggestedStorage = {
          DimensionID: Math.random().toString(36).substr(2, 9),
          DimensionLabel: getDimensioName(),
          ActionLabelID: Math.random().toString(36).substr(2, 9),
          ActionLabelIndex: i,
          AddSuggestedActionButtonID: Math.random().toString(36).substr(2, 9),
          Show: "block"
        }
        WrraperForSA.push(SuggestedStorage);
      }
      JSONstorageSuggestedStorage.value = '{"SuggestedStorage":' + JSON.stringify(WrraperForSA) + "}";
    }
  }
}

function generateSuggestedActions() {
  var JSONstorageSuggestedActions = document.getElementById("JSONstorageSuggestedActions");
  var objectSA = JSON.parse(JSONstorageSuggestedActions.value);
  var DefaultActions = document.getElementById("DefaultActions");
  var SuggestedActions = document.getElementById("SuggestedActions");
  console.log(objectSA.SuggestedStorage.length);
  for (var i = 0; i < objectSA.SuggestedStorage.length; i++) {
    var divForSuggestedActions = document.createElement("DIV");
    divForSuggestedActions.style.display = objectSA.SuggestedStorage[i].Show;
    var dimensionLabel = document.createElement("LABEL");
    dimensionLabel.innerHTML = objectSA.SuggestedStorage[i].DimensionLabel;
    dimensionLabel.id = objectSA.SuggestedStorage[i].DimensionID;
    divForSuggestedActions.appendChild(dimensionLabel);
    divForSuggestedActions.appendChild(document.createElement("BR"));
    var actionLabel = document.createElement("LABEL");
    actionLabel.id = objectSA.SuggestedStorage[i].ActionLabelID;
    for (var j = 0; j < DefaultActions.options.length; j++) {
      if (DefaultActions.options[j].index == objectSA.SuggestedStorage[i].ActionLabelIndex) {
        var actionLabel = document.createElement("Label");
        actionLabel.id = objectSA.SuggestedStorage[i].ActionLabelId;
        actionLabel.className = "actionLabel";
        actionLabel.innerHTML = DefaultActions.options[j].text;
        divForSuggestedActions.appendChild(actionLabel);
        divForSuggestedActions.appendChild(document.createElement("BR"));
      }
    }
    var addSuggestedActionButton = document.createElement("BUTTON");
    addSuggestedActionButton.id = objectSA.SuggestedStorage[i].AddSuggestedActionButtonID;
    addSuggestedActionButton.className = "addSuggestedActionButton";
    addSuggestedActionButton.innerHTML = "Add Suggested Action";
    addSuggestedActionButton.addEventListener("click", function() {
      for (var k = 0; k < objectSA.SuggestedStorage.length; k++) {
        if (objectSA.SuggestedStorage[k].AddSuggestedActionButtonID == event.target.id) {
          event.target.parentNode.style.display = "none";
          objectSA.SuggestedStorage[k].Show = "none";
          var RemoveActionButtonId = Math.random().toString(36).substr(2, 9);
          var ActionNameID = Math.random().toString(36).substr(2, 9);
          var ActionDetailsID = Math.random().toString(36).substr(2, 9);
          var ActionDateID = Math.random().toString(36).substr(2, 9);
          var ActionOwnerID = Math.random().toString(36).substr(2, 9);
          var DropdownOption = Math.random().toString(36).substr(2, 9);
          var ActionProgressID = Math.random().toString(36).substr(2, 9);
          var OpenModalButtonID = Math.random().toString(36).substr(2, 9);
          var ModalID = Math.random().toString(36).substr(2, 9);
          var MyProgressID = Math.random().toString(36).substr(2, 9);
          var MyBarID = Math.random().toString(36).substr(2, 9);
          var SAname = getDimensioName(); /*document.getElementById(objectSA.SuggestedStorage[k].DimensionID).innerHTML;*/
          var SADetails = document.getElementById(objectSA.SuggestedStorage[k].actionLabelID).innerHTML;
          var Action = {
            showModal: "none",
            OpenModalButton: "Not started",
            OpenModalButtonID: OpenModalButtonID,
            DropdownOption: 0,
            DropdownID: DropdownOption,
            ActionProgress: 0,
            ActionProgressDisabled: true,
            ActionProgressID: ActionProgressID,
            ActionProgressColor: "grey",
            ActionName: SAname,
            ActionNameID: ActionNameID,
            ActionDetails: SADetails,
            ActionDetailsID: ActionDetailsID,
            ActionDate: "",
            ActionDateID: ActionDateID,
            ActionOwner: user.value,
            ActionOwnerID: ActionOwnerID,
            ActionID: RemoveActionButtonId,
            ModalWindowID: ModalID,
            MyProgressID: MyProgressID,
            MyBarID: MyBarID,
            removedIndex: k
          };
          WrapperForActions.Actions.push(Action);
          JSONstorageActions.value = (JSON.stringify(WrapperForActions));
          JSONstorageSuggestedActions.value = JSON.stringify(objectSA);
        }
      }
    });
    divForSuggestedActions.appendChild(addSuggestedActionButton);
    divForSuggestedActions.appendChild(document.createElement("BR"));
    SuggestedActions.appendChild(divForSuggestedActions);
  }
}

function NumbersOnly(event)
{
     var numbers='0123456789';
         console.log(event.which);  /*console.log(event.which);    */
  if(numbers.indexOf(event.key)===-1)
                   {
                     if(!(event.key=="Backspace")){
                     event.preventDefault();
                     return false;
                     }
                     else{return true;}
                   }

}

///////////////////////////////////////////////////////////GENERATE Actions
function generateActions() {
  var ActionsDIV = document.getElementById("Actions");
  if (!WrapperForActions.Actions.length == 0) {
    for (var j = 0; j < WrapperForActions.Actions.length; j++) {
      var modal = document.createElement("DIV");
      modal.className = "modal";
      modal.id = WrapperForActions.Actions[j].ModalWindowID;

      var modalcontent = document.createElement("DIV");
      modalcontent.className = "modal-content";

      var divAC = document.createElement("DIV");
      divAC.className = "actionDiv";

      var divProgress = document.createElement("DIV");
      divProgress.id = WrapperForActions.Actions[j].MyProgressID;
      divProgress.className = "divProgress";
      divProgress.style.width = '50%';
      divProgress.style.backgroundColor = '#d3d3d3';

      var divBar = document.createElement("DIV");
      divBar.id = WrapperForActions.Actions[j].MyBarID;
      divBar.className = "divBar";
      divBar.style.backgroundColor = WrapperForActions.Actions[j].ActionProgressColor;
      divBar.style.height = '30px';

      var width = WrapperForActions.Actions[j].ActionProgress;
      if (width.value == "") {
        divBar.style.width = 0 + '%';
      } else if (width > 100 || width < 0) {
        divBar.style.width = 0 + '%';
      } else {
        var stringProgress = parseInt(JSON.stringify(WrapperForActions.Actions[j].ActionProgress)) + '%';
        console.log(stringProgress);
        divBar.style.width = stringProgress;
      }

      divProgress.appendChild(divBar);
      var array = [];
      var StatusDropdown = document.getElementById("StatusDropdown");
      for (var i = 0; i < StatusDropdown.options.length - 1; i++) {
        array.push(StatusDropdown.options[i].text);
      }
      var selectList = document.createElement("SELECT");
      var openModalButton = document.createElement("LABEL");
      openModalButton.id = WrapperForActions.Actions[j].OpenModalButtonID;
      openModalButton.className = "openModalButton";
      openModalButton.innerHTML = WrapperForActions.Actions[j].OpenModalButton;
      selectList.id = WrapperForActions.Actions[j].DropdownID;
      for (var k = 0; k < array.length; k++) {
        var option = document.createElement("option");
        option.value = array[k];
        option.text = array[k];
        selectList.appendChild(option);
      }
      selectList.selectedIndex = WrapperForActions.Actions[j].DropdownOption;

      selectList.addEventListener("change", function() {
        for (var l = 0; l < WrapperForActions.Actions.length; l++) {
          console.log(l);
          if (WrapperForActions.Actions[l].DropdownID == event.target.id) {
            WrapperForActions.Actions[l].DropdownOption = event.target.selectedIndex;
            WrapperForActions.Actions[l].OpenModalButton = event.target.value;
            JSONstorageActions.value = (JSON.stringify(WrapperForActions));
            var theRealButton = document.getElementById(WrapperForActions.Actions[l].OpenModalButtonID);
            theRealButton.innerHTML = event.target.value;
            var theProgressInput = document.getElementById(WrapperForActions.Actions[l].ActionProgressID);
            var theProgressBar = document.getElementById(WrapperForActions.Actions[l].MyBarID);

            switch (event.target.selectedIndex) {
              case 0:
                console.log(event.target.selectedIndex);
                theProgressInput.value = 0;
                theProgressInput.disabled = true;
                theProgressBar.style.width = 0 + '%';
                WrapperForActions.Actions[l].ActionProgressDisabled = true;
                WrapperForActions.Actions[l].ActionProgress = 0;
                JSONstorageActions.value = (JSON.stringify(WrapperForActions));
                break;
              case 1:
                theProgressInput.disabled = false;
                theProgressBar.style.backgroundColor = "#FFFF00";
                WrapperForActions.Actions[l].ActionProgressDisabled = theProgressInput.disabled;
                WrapperForActions.Actions[l].ActionProgressColor = theProgressBar.style.backgroundColor;
                JSONstorageActions.value = (JSON.stringify(WrapperForActions));
                break;
              case 2:
                theProgressInput.disabled = false;
                theProgressBar.style.backgroundColor = "blue";
                WrapperForActions.Actions[l].ActionProgressDisabled = theProgressInput.disabled;
                WrapperForActions.Actions[l].ActionProgressColor = theProgressBar.style.backgroundColor;
                JSONstorageActions.value = (JSON.stringify(WrapperForActions));
                break;
              case 3:
                theProgressInput.disabled = true;
                theProgressInput.value = 100;
                theProgressBar.style.backgroundColor = "green";
                theProgressBar.style.width = 100 + '%';
                WrapperForActions.Actions[l].ActionProgressDisabled = theProgressInput.disabled;
                WrapperForActions.Actions[l].ActionProgressColor = theProgressBar.style.backgroundColor;
                WrapperForActions.Actions[l].ActionProgress = 100;
                JSONstorageActions.value = (JSON.stringify(WrapperForActions));
                break;
              case 4:
                theProgressInput.disabled = false;
                theProgressBar.style.backgroundColor = "grey";
                WrapperForActions.Actions[l].ActionProgressDisabled = theProgressInput.disabled;
                WrapperForActions.Actions[l].ActionProgressColor = theProgressBar.style.backgroundColor;
                JSONstorageActions.value = (JSON.stringify(WrapperForActions));
                break;
            }
          }
        }

      })

      var BR = document.createElement("BR");
      var BR2 = document.createElement("BR");
      var ActionNameInput = document.createElement("INPUT");
      ActionNameInput.className = "ActionNameInput";

      var ActionDetailsInput = document.createElement("TEXTAREA");
      ActionDetailsInput.className = "ActionNameInput";

      var removeActionButton = document.createElement("BUTTON");
      removeActionButton.className = "removeActionButton";

      var DateLabel = document.createElement("LABEL");
      DateLabel.className = "ActionLabel";

      var Date = document.createElement("INPUT");
      Date.className = "Date";

      var ownerLabel = document.createElement("LABEL");
      ownerLabel.className = "ActionLabel";

      var owner = document.createElement("INPUT");
      owner.className = "owner";

      var progressinput = document.createElement("INPUT");
      progressinput.setAttribute("type", "text");
      progressinput.disabled = WrapperForActions.Actions[j].ActionProgressDisabled;
      progressinput.value = WrapperForActions.Actions[j].ActionProgress;
      progressinput.id = WrapperForActions.Actions[j].ActionProgressID;
      progressinput.backgroundColor = WrapperForActions.Actions[j].ActionProgressColor;
      progressinput.addEventListener("input", function() {
        for (var u = 0; u < WrapperForActions.Actions.length; u++) {
          console.log(JSON.stringify(WrapperForActions.Actions[u].ActionProgressID));
          console.log();
          if (WrapperForActions.Actions[u].ActionProgressID == event.target.id) {

            var progressinputvalue = document.getElementById(WrapperForActions.Actions[u].ActionProgressID);
            var newWidth = parseInt(progressinputvalue.value);
            console.log(newWidth);
            var progressbar = document.getElementById(WrapperForActions.Actions[u].MyBarID);
            if (newWidth == "" || newWidth == null || isNaN(newWidth)) {
              progressbar.style.width = 0;
            } else if (newWidth > 100 || newWidth < 0) {
              progressbar.style.width = 0;
            } else {
              console.log("I am here");
              progressbar.style.width = newWidth + '%';
            }
            WrapperForActions.Actions[u].ActionProgress = parseInt(event.target.value);
            JSONstorageActions.value = (JSON.stringify(WrapperForActions));
          }
        }
      })
      progressinput.addEventListener("keydown", NumbersOnly);



      modalcontent.appendChild(selectList);
      modalcontent.appendChild(progressinput);
      modal.appendChild(modalcontent);
      openModalButton.addEventListener("click", function() {
        for (var l = 0; l < WrapperForActions.Actions.length; l++) {
          if (WrapperForActions.Actions[l].OpenModalButtonID == event.target.id) {
            if (WrapperForActions.Actions[l].showModal == "none") {
              console.log(WrapperForActions.Actions[l].showModal);
              var theOneModal = document.getElementById(WrapperForActions.Actions[l].ModalWindowID);
              theOneModal.style.display = "block";
              console.log(WrapperForActions.Actions[l].showModal);
              JSONstorageActions.value = (JSON.stringify(WrapperForActions));
            } else {
              theOneModal.style.display = "none";
            }
          }
        }
      })
      removeActionButton.id = WrapperForActions.Actions[j].ActionID;
      var removeText = "Remove Action";
      removeActionButton.innerHTML = removeText;
      removeActionButton.addEventListener("click", function() {
        var y = event.target.id;
        removeAction(y, WrapperForActions);
      })
      ActionNameInput.setAttribute("type", "text");
      ActionNameInput.value = WrapperForActions.Actions[j].ActionName;
      ActionNameInput.id = WrapperForActions.Actions[j].ActionNameID;
      ActionNameInput.placeholder = "New Action";
      ActionNameInput.addEventListener("input", function() {
        for (var l = 0; l < WrapperForActions.Actions.length; l++) {
          if (WrapperForActions.Actions[l].ActionNameID == event.target.id) {
            WrapperForActions.Actions[l].ActionName = event.target.value;
            JSONstorageActions.value = (JSON.stringify(WrapperForActions));
          }
        }
      })

      ActionDetailsInput.setAttribute("type", "text");
      ActionDetailsInput.value = WrapperForActions.Actions[j].ActionDetails;
      ActionDetailsInput.id = WrapperForActions.Actions[j].ActionDetailsID;
      ActionDetailsInput.placeholder = "Add some details...";
      ActionDetailsInput.addEventListener("input", function() {
        for (var o = 0; o < WrapperForActions.Actions.length; o++) {
          if (WrapperForActions.Actions[o].ActionDetailsID == event.target.id) {
            WrapperForActions.Actions[o].ActionDetails = event.target.value;
            JSONstorageActions.value = (JSON.stringify(WrapperForActions));
          }
        }
      })

      DateLabel.innerHTML = "Date:";
      Date.setAttribute("type", "Date");
      Date.value = WrapperForActions.Actions[j].ActionDate;
      Date.id = WrapperForActions.Actions[j].ActionDateID;
      Date.addEventListener("input", function() {
        for (var p = 0; p < WrapperForActions.Actions.length; p++) {
          if (WrapperForActions.Actions[p].ActionDateID == event.target.id) {
            WrapperForActions.Actions[p].ActionDate = event.target.value;
            JSONstorageActions.value = (JSON.stringify(WrapperForActions));
          }
        }
      })

      ownerLabel.innerHTML = "Owner:";
      if (userRole.value == "HGU" || userRole.value == "PU") {
        owner.setAttribute("type", "input");
        owner.value = WrapperForActions.Actions[j].ActionOwner;
        owner.id = WrapperForActions.Actions[j].ActionOwnerID;
        owner.addEventListener("input", function() {
          for (var h = 0; h < WrapperForActions.Actions.length; h++) {
            if (WrapperForActions.Actions[h].ActionOwnerID == event.target.id) {
              WrapperForActions.Actions[h].ActionOwner = event.target.value;
              JSONstorageActions.value = (JSON.stringify(WrapperForActions));
            }
          }
        })
      } else {
        owner.disabled = true;
        owner.value = WrapperForActions.Actions[j].ActionOwner;
      }
      divAC.appendChild(modal);
      divAC.appendChild(openModalButton);
      divAC.appendChild(removeActionButton);
      divAC.appendChild(divProgress);
      divAC.appendChild(ActionNameInput);
      divAC.appendChild(BR2);
      divAC.appendChild(ActionDetailsInput);
      divAC.appendChild(BR);
      divAC.appendChild(DateLabel);
      divAC.appendChild(Date);
      divAC.appendChild(ownerLabel);
      divAC.appendChild(owner);
      ActionsDIV.appendChild(divAC);
    }
  }
}

/*
DETAILS section
*/
//Generates ditails information based on JSONstorageDetails
function genarateDetails() {
  var QuestionOG = document.getElementById("Questions");
  var RelatedDIV = document.getElementById("Related");
  var statusInput = document.getElementById("statusInput");
  var owner = document.getElementById("owner");
  if (userRole.value == "HGU" || userRole.value == "PU") {
    var ownerLabel = document.createElement("INPUT");
    ownerLabel.value = user.value;
  } else {
    var ownerLabel = document.createElement("LABEL");
    ownerLabel.innerHTML = user.value;
  }
  owner.appendChild(ownerLabel);
  StatusDropdown.selectedIndex = ActionDetails.StatusOption;
  statusModalOpener.style.color = ActionDetails.statusModalOpenerColor;
  statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + ActionDetails.progressInput + ' %';
  DueDate.value = ActionDetails.Date;
  ImportanceDropdown.selectedIndex = ActionDetails.Importance;
  costInput.value = ActionDetails.Cost;
  notesInput.value = ActionDetails.Notes;
  var questions = document.getElementById("Questions");
  statusInput.value = ActionDetails.statusModalOpenerColor;
  statusInput.value = ActionDetails.progressInput;
  statusInput.disabled = ActionDetails.statusModalOpenerdisabled;
  statusInput.oninput = function() {
    if (!(event.target.value <= 100 && event.target.value >= 0)) {
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text;
    } else {
      ActionDetails.progressInput = event.target.value;
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + ActionDetails.progressInput + ' %';
      JSONstorageDetails.value = JSON.stringify(ActionDetails);
    }
  }
   statusInput.addEventListener("keydown", NumbersOnly);
  statusModalOpener.onclick = function() {
    var modal = document.getElementById("statusModal");
    console.log(modal.style.display);
      modal.style.display = "block";
  }

  for (var i = 0; i < ActionDetails.Relatable.length; i++) {
    var divForQuestion = document.createElement("DIV");
    divForQuestion.className = "divForQuestion";
    var indexOfQuestion = ActionDetails.Relatable[i].QuestionIndex;
    var QuestionLabel = document.createElement("LABEL");
    QuestionLabel.innerHTML = QuestionOG.options[indexOfQuestion].text;
    divForQuestion.appendChild(QuestionLabel);
    var RemoveQuestion = document.createElement("BUTTON");
    RemoveQuestion.innerHTML = "-";
    RemoveQuestion.id = ActionDetails.Relatable[i].RemoveButtonID;
    RemoveQuestion.addEventListener("click", function() {
      removeQuestion(event.target.id);
    });
    var BR = document.createElement("BR");
    divForQuestion.appendChild(RemoveQuestion);
    RelatedDIV.appendChild(divForQuestion);
  }
  JSONstorageDetails.value = JSON.stringify(ActionDetails);
}


//This block handles that input of user is saved to JSON storage details
ImportanceDropdown.oninput = function() {
  ActionDetails.Importance = event.target.selectedIndex;
  JSONstorageDetails.value = (JSON.stringify(ActionDetails));
}


DueDate.oninput = function() {
  ActionDetails.Date = event.target.value;
  JSONstorageDetails.value = (JSON.stringify(ActionDetails));
}

StatusDropdown.oninput = function() {
  var statusModalOpener = document.getElementById("statusModalOpener");
  ActionDetails.StatusOption = event.target.selectedIndex;
  statusModalOpener.innerHTML = event.target.options[event.target.selectedIndex].text;
  JSONstorageDetails.value = JSON.stringify(ActionDetails);
  switch (ActionDetails.StatusOption) {
    case 0:
      statusModalOpener.style.color = "black";
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + 0 + '%';
      statusInput.disabled = true;
      statusInput.value = 0;
      ActionDetails.statusModalOpenerColor = "black";
      ActionDetails.progressInput = 0;
      ActionDetails.statusModalOpenerdisabled = true;
      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
      break;
    case 1:
      statusModalOpener.style.color = "#FFA500";
      ActionDetails.statusModalOpenerColor = "#FFA500";
      statusInput.disabled = false;
      ActionDetails.statusModalOpenerdisabled = false;
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + ActionDetails.progressInput + ' ' + '%';

      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
      break;
    case 2:
      statusModalOpener.style.color = "blue";
      ActionDetails.statusModalOpenerColor = "blue";
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + ActionDetails.progressInput + '%';
      statusInput.disabled = false;
      ActionDetails.statusModalOpenerdisabled = false;

      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
      break;
    case 3:
      statusInput.disabled = true;
      statusInput.value = 100;
      statusModalOpener.style.color = "green";
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + 100 + '%';
      ActionDetails.statusModalOpenerdisable = true;
      ActionDetails.statusModalOpenerColor = "green";
      ActionDetails.progressInput = 100;

      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
      break;
    case 4:
      statusInput.disabled = false;
      statusModalOpener.style.color = "grey";
      ActionDetails.statusModalOpenerColor = "grey";
      statusModalOpener.innerHTML = StatusDropdown.options[ActionDetails.StatusOption].text + ' ' + ActionDetails.progressInput + '%';
      ActionDetails.statusModalOpenerdisable = false;
      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
      break;
  }
}

notesInput.oninput = function() {
  ActionDetails.Notes = notesInput.value;
  JSONstorageDetails.value = JSON.stringify(ActionDetails);
}

costInput.oninput = function() {
  ActionDetails.Cost = costInput.value;
  JSONstorageDetails.value = JSON.stringify(ActionDetails);
}

//Event that opens modal window whit dropwdown
AddNewQuestion.onclick = function() {
  var SelectRelatedID = Math.random().toString(36).substr(2, 9);
  var RelatedDIV = document.getElementById("Related");
  var QuestionOG = document.getElementById("Questions");
  var QuestionsDropdown = document.createElement("Select");
  var divForQuestion = document.createElement("DIV");
  var br = document.createElement("BR");
  var modal = document.createElement("DIV");
  modal.id = "QuestionsDropdown";
  modal.className = "modal";
  modal.style.display = "Block";
  var modalContent = document.createElement("DIV");
  modal.appendChild(modalContent);
  modalContent.className = "modal-content";
  var array = [];
  for (var i = 0; i < QuestionOG.options.length; i++) {
    array.push(QuestionOG.options[i].text);
  }

  for (var i = 0; i < QuestionOG.options.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.text = array[i];
    QuestionsDropdown.appendChild(option);
  }
//When Question is selected from dropdown modal window is closed and label created in Raleted block
  QuestionsDropdown.id = SelectRelatedID;
  QuestionsDropdown.addEventListener("input", function() {
    var QuestionLabel = document.createElement("LABEL");
    var SelectRelatedID = Math.random().toString(36).substr(2, 9);
    var RemoveButtonID = Math.random().toString(36).substr(2, 9);
    var RelatedDIV = document.getElementById("Related");
    var divForQuestion = document.createElement("DIV");
    divForQuestion.className = "divForQuestion";
    modal.style.display = "none";
    QuestionLabel.innerHTML = event.target.value;
    var Question = {
      RemoveButtonID: RemoveButtonID,
      SelectedRelatedID: SelectRelatedID,
      QuestionIndex: event.target.selectedIndex
    }

    divForQuestion.appendChild(QuestionLabel);

    var RemoveButton = document.createElement("BUTTON");
    RemoveButton.innerHTML = "-";
    RemoveButton.id = RemoveButtonID;
    RemoveButton.addEventListener("click", function() {
      removeQuestion(event.target.id);
    });
    divForQuestion.appendChild(RemoveButton);
    RelatedDIV.appendChild(divForQuestion);
    ActionDetails.Relatable.push(Question);
    JSONstorageDetails.value = (JSON.stringify(ActionDetails));
  });

  modal.appendChild(modalContent);
  modalContent.appendChild(QuestionsDropdown);

  RelatedDIV.appendChild(modal);
  RelatedDIV.appendChild(QuestionLabel);

  RelatedDIV.appendChild(br);
  JSONstorageDetails.value = (JSON.stringify(ActionDetails));
}


//When button "-" is clicked remove question and update in JSONstorageDetails.
function removeQuestion(QuestionIndex) {
  for (var i = 0; i < ActionDetails.Relatable.length; i++) {
    if (QuestionIndex == ActionDetails.Relatable[i].RemoveButtonID) {
      ActionDetails.Relatable.splice(i, 1);
      JSONstorageDetails.value = (JSON.stringify(ActionDetails));
    }
  }
}
