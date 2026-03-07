let allIssues = [];


const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");

  if (status) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};


const loadIssues = async () => {
  manageSpinner(true);

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );

  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);

  manageSpinner(false);
};


const displayIssues = (issues) => {
  const container = document.getElementById("issues-container");

  container.innerHTML = "";

  document.getElementById("issue-count").innerText =
    issues.length + " Issues";

  issues.forEach((issue) => {
    const div = document.createElement("div");

    div.className = `
      bg-white p-5 rounded-lg shadow border-t-4 hover:shadow-lg transition
      ${issue.status === "open" ? "border-green-500" : "border-purple-500"}
    `;

    div.innerHTML = `

      <!-- Priority -->
      <div class="flex justify-end mb-2">
        <span class="text-xs font-semibold px-2 py-1 rounded text-white
        ${
          issue.priority === "high"
            ? "bg-red-500"
            : issue.priority === "medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }">
          ${issue.priority}
        </span>
      </div>

      <!-- Title -->
      <h2 class="font-bold text-lg mb-1">
        ${issue.title}
      </h2>

      <!-- Description -->
      <p class="text-gray-500 mb-3">
        ${issue.description}
      </p>

      <!-- Labels -->
      <div class="flex gap-2 flex-wrap mb-3">
        ${
          issue.labels
            ? issue.labels
                .map(
                  (label) => `
          <span class="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
            ${label}
          </span>
          `
                )
                .join("")
            : ""
        }
      </div>

      <!-- Bottom -->
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-400">
          ${new Date(issue.createdAt).toLocaleString()}
        </div>

        <button
          onclick="loadIssueDetails(${issue.id})"
          class="btn btn-xs btn-outline">
          Details
        </button>
      </div>
    `;

    container.appendChild(div);
  });
};


const filterIssues = (status) => {
  const filtered = allIssues.filter((issue) => issue.status === status);
  displayIssues(filtered);
};


const loadIssueDetails = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );

  const data = await res.json();

  displayModal(data.data);
};


const displayModal = (issue) => {
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `

<h2 class="text-2xl font-bold mb-4">
  ${issue.title}
</h2>

<div class="flex items-center gap-2 text-sm mb-4">
  <span class="px-2 py-1 text-white text-xs rounded
    ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"}">
    ${issue.status}
  </span>

  <span class="text-gray-600">
    by ${issue.author}
  </span>

  <span class="text-gray-400">
    ${new Date(issue.createdAt).toLocaleString()}
  </span>
</div>

<div class="flex gap-2 flex-wrap mb-4">
  ${
    issue.labels
      ? issue.labels
          .map(
            (label) => `
    <span class="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
      ${label}
    </span>
    `
          )
          .join("")
      : ""
  }
</div>

<p class="text-gray-600 mb-5">
  ${issue.description}
</p>

<div class="flex justify-between items-center border-t pt-4">
  <div class="text-sm text-gray-600">
    <strong>Assignee:</strong> ${issue.author}
  </div>

  <div>
    <span class="text-xs font-semibold px-2 py-1 rounded text-white
      ${
        issue.priority === "high"
          ? "bg-red-500"
          : issue.priority === "medium"
          ? "bg-yellow-500"
          : "bg-green-500"
      }">
      ${issue.priority}
    </span>
  </div>
</div>
`;

  document.getElementById("issue_modal").showModal();
};


document.getElementById("search-btn").addEventListener("click", async () => {
  const text = document.getElementById("search-input").value;

  manageSpinner(true);

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  );

  const data = await res.json();

  displayIssues(data.data);

  manageSpinner(false);
});


loadIssues();






const filterButtons = document.querySelectorAll("section button");

const setActiveButton = (clickedBtn) => {
  filterButtons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  clickedBtn.classList.add("btn-primary");
  clickedBtn.classList.remove("btn-outline");
};

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveButton(btn);
  });
});
