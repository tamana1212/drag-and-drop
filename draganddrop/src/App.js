import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const plusIcons = document.querySelectorAll('.plus-icon');
    const minusIcons = document.querySelectorAll('.minus-icon');
    const displayInput = document.querySelectorAll('.display-input');
    const draggables = document.querySelectorAll('.question-container');
    const containers = document.querySelectorAll('.all-ques-suggestn');

  plusIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const sgtnQuesDiv = icon.closest(".sgtn-ques");
      sgtnQuesDiv.style.display = "none";

      const diplayQuesWrapperDiv = sgtnQuesDiv.nextElementSibling;
      diplayQuesWrapperDiv.style.display = "flex";
      diplayQuesWrapperDiv.parentNode.style.order = "-1";
      icon.parentNode.parentNode.parentNode.id = "w-100";
    });
  });

    displayInput.forEach((element) => {
      element.addEventListener('focus', () => {
        document.querySelectorAll('.diplayQues_wrapper').forEach((ele) => (ele.id = ''));
        element.parentNode.parentNode.id = 'focused';
      });
    });

  minusIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const diplayQuesWrapperDiv = icon.closest(".diplayQues_wrapper");
      diplayQuesWrapperDiv.style.display = "none";

      const sgtnQuesDiv = diplayQuesWrapperDiv.previousElementSibling;
      sgtnQuesDiv.style.display = "flex";
      sgtnQuesDiv.parentNode.style.order = "0";
      icon.parentNode.parentNode.parentNode.parentNode.id = "";
    });
  });
  

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');

        if (draggable) {
          const afterElement = getDragAfterElement(container, e.clientY);

          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll('.question-container:not(.dragging)'),
      ];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset > 0 && offset < closest.offset) {
          return { offset: offset, element: child };
        } else if (offset < 0 && Math.abs(offset) < Math.abs(closest.offset)) {
          return { offset: offset, element: child };
        }

        return closest;
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    return () => {
      plusIcons.forEach((icon) => {
        icon.removeEventListener('click', () => { });
      });

      displayInput.forEach((element) => {
        element.removeEventListener('focus', () => { });
      });

      minusIcons.forEach((icon) => {
        icon.removeEventListener('click', () => { });
      });

      draggables.forEach((draggable) => {
        draggable.removeEventListener('dragstart', () => { });
        draggable.removeEventListener('dragend', () => { });
      });

      containers.forEach((container) => {
        container.removeEventListener('dragover', () => { });
      });
    };
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="before-chat">
          <h5>Before Chat Details</h5>
          <div className="all-ques-suggestn">
            <div className="question-container" draggable="true">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"
                      />
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Age</div>
                <div className="suggestion-ques">What is your age?</div>
              </div>

              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Age</div>
                  <input
                    type="text"
                    value="What is your age?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="question-container" draggable="true">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"
                      />
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Email</div>
                <div className="suggestion-ques">
                  Please provide your email address?
                </div>
              </div>

              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Email</div>
                  <input
                    type="text"
                    value="Please provide your email address?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="after-chat">
          <h5>After Chat Details</h5>
          <div className="all-ques-suggestn">
            <div className="question-container" draggable="true">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"
                      />
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Age</div>
                <div className="suggestion-ques">What is your age?</div>
              </div>

              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Age</div>
                  <input
                    type="text"
                    value="What is your age?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ques-suggestions">
          <div className="fx al-cnt jstfy-sp-btw">
            <p>Suggestion</p>
          </div>
          <div className="all-ques-suggestn">
            <div className="question-container">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"></path>
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Email</div>
                <span className="suggestion-ques">
                  Please provide your email address?
                </span>
              </div>
              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Email</div>
                  <input
                    type="text"
                    value="Please Provide your email?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="question-container">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"></path>
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Phone</div>
                <span className="suggestion-ques">Please provide your phone?</span>
              </div>
              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Phone</div>
                  <input
                    type="text"
                    value="Please provide your phone?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="question-container">
              <div className="sgtn-ques flex-cnt gap-6" draggable="true">
                <div className="flex-cnt">
                  <button className="flex-cnt plus-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.64045 12.5C5.49064 12.5 5.3633 12.4551 5.25843 12.3652C5.16854 12.2603 5.1236 12.133 5.1236 11.9831V7.30899H0.516854C0.367041 7.30899 0.2397 7.26405 0.134831 7.17416C0.0449438 7.06929 0 6.94195 0 6.79214V6.07303C0 5.92322 0.0449438 5.80337 0.134831 5.71348C0.2397 5.60861 0.367041 5.55618 0.516854 5.55618H5.1236V1.01685C5.1236 0.867041 5.16854 0.747191 5.25843 0.657304C5.3633 0.552435 5.49064 0.5 5.64045 0.5H6.42697C6.57678 0.5 6.69663 0.552435 6.78652 0.657304C6.89139 0.747191 6.94382 0.867041 6.94382 1.01685V5.55618H11.573C11.7228 5.55618 11.8427 5.60861 11.9326 5.71348C12.0375 5.80337 12.0899 5.92322 12.0899 6.07303V6.79214C12.0899 6.94195 12.0375 7.06929 11.9326 7.17416C11.8427 7.26405 11.7228 7.30899 11.573 7.30899H6.94382V11.9831C6.94382 12.133 6.89139 12.2603 6.78652 12.3652C6.69663 12.4551 6.57678 12.5 6.42697 12.5H5.64045Z"
                        fill="#666666"></path>
                    </svg>
                  </button>
                </div>
                <div className="suggestion-label">Phone</div>
                <span className="suggestion-ques">Please provide your phone?</span>
              </div>
              <div className="diplayQues_wrapper" draggable="true">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="1.45455"
                    cy="1.45455"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="1.45455" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="7.99996"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="7.99996" r="1.45455" fill="#FFE0E1" />
                  <circle
                    cx="1.45455"
                    cy="14.5454"
                    r="1.45455"
                    fill="#FFE0E1"
                  />
                  <circle cx="8" cy="14.5454" r="1.45455" fill="#FFE0E1" />
                </svg>
                <div className="display-question flex-cnt">
                  <div className="question-label">Phone</div>
                  <input
                    type="text"
                    value="Please provide your phone?"
                    className="display-input"
                  />
                  <div className="flex-cnt">
                    <button className="flex-cnt minus-icon">
                      <svg
                        width="9"
                        height="4"
                        viewBox="0 0 9 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.24449 1.12107C1.05132 1.27702 0.954529 1.49786 0.954529 1.73411V2.26611C0.954529 2.50047 1.04846 2.71051 1.21575 2.86808L1.24313 2.89386L1.27406 2.91527C1.45241 3.03868 1.65432 3.08811 1.85337 3.08811H7.05569C7.25126 3.08811 7.46546 3.0399 7.64723 2.89315C7.83047 2.74521 7.95453 2.52913 7.95453 2.26611V1.73411C7.95453 1.4797 7.83744 1.26475 7.64805 1.12098C7.47205 0.969274 7.25913 0.912109 7.05569 0.912109H1.85337C1.63701 0.912109 1.42434 0.975869 1.24449 1.12107ZM1.24449 1.12107L1.55857 1.51011M1.24449 1.12107L1.55857 1.51011M1.55857 1.51011C1.6395 1.44478 1.73777 1.41211 1.85337 1.41211H7.05569C7.17129 1.41211 7.26378 1.44478 7.33314 1.51011C7.41407 1.56611 7.45453 1.64078 7.45453 1.73411V2.26611C7.45453 2.35944 7.41407 2.43878 7.33314 2.50411C7.26378 2.56011 7.17129 2.58811 7.05569 2.58811H1.85337C1.73777 2.58811 1.6395 2.56011 1.55857 2.50411C1.48921 2.43878 1.45453 2.35944 1.45453 2.26611V1.73411C1.45453 1.64078 1.48921 1.56611 1.55857 1.51011Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
