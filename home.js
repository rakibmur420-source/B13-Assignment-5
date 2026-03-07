let allIssues = []


// Spinner

const manageSpinner = (status) => {

const spinner = document.getElementById("spinner")

if (status) {
spinner.classList.remove("hidden")
}
else {
spinner.classList.add("hidden")
}

}



// Load All Issues

const loadIssues = async () => {

manageSpinner(true)

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

manageSpinner(false)

}



// Display Issues

const displayIssues = (issues) => {

const container = document.getElementById("issues-container")

container.innerHTML = ""

document.getElementById("issue-count").innerText =
issues.length + " Issues"



issues.forEach(issue => {

const div = document.createElement("div")

div.className = "bg-white p-5 rounded-lg shadow"



div.innerHTML = `

<!-- Priority -->
<div class="flex justify-end mb-2">

<span class="badge text-white
${issue.priority === "high"
? "bg-red-500"
: issue.priority === "medium"
? "bg-yellow-500"
: "bg-green-500"}">

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

${issue.labels.map(label => `
<span class="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
${label}
</span>
`).join("")}

</div>



<!-- Bottom Row -->
<div class="flex justify-between items-center">

<div class="text-sm text-gray-400">
${new Date(issue.createdAt).toLocaleString()}
</div>


<div class="flex gap-2 items-center">

<span class="badge
${issue.status === "open"
? "badge-success"
: "badge-error"}">

${issue.status}

</span>


<button
onclick="loadIssueDetails(${issue.id})"
class="btn btn-sm btn-outline">

Details

</button>

</div>

</div>

`


container.appendChild(div)

})

}



// Filter Issues

const filterIssues = (status) => {

const filtered =
allIssues.filter(issue => issue.status === status)

displayIssues(filtered)

}



// Load Single Issue

const loadIssueDetails = async (id) => {

const res =
await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

displayModal(data.data)

}



// Modal

const displayModal = (issue) => {

const modalContent =
document.getElementById("modal-content")

modalContent.innerHTML = `

<h2 class="text-2xl font-bold mb-3">
${issue.title}
</h2>

<p class="mb-4 text-gray-600">
${issue.description}
</p>


<div class="mb-2">
<strong>Status:</strong>
${issue.status}
</div>


<div class="mb-2">
<strong>Priority:</strong>
${issue.priority}
</div>


<div class="mb-2">
<strong>Labels:</strong>

${issue.labels.map(label => `
<span class="px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800 mr-2">
${label}
</span>
`).join("")}

</div>


<p class="text-gray-400 text-sm mt-3">
Created at: ${new Date(issue.createdAt).toLocaleString()}
</p>

`


document.getElementById("issue_modal").showModal()

}



// Search

document.getElementById("search-btn")
.addEventListener("click", async () => {

const text =
document.getElementById("search-input").value

manageSpinner(true)

const res =
await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

manageSpinner(false)

})



// Initial Load

loadIssues()
