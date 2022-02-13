/**
 * These variables allow us to track how many operations this script performs;
 * they are for testing only. You can ignore them when you see them referenced
 * elsewhere in this file.
 */
var firstCheckOpsCount = 0
var secondCheckOpsCount = 0

/** Code related to your challenge starts here. */
var acmeSoftwareScriptPaths = [
	{
		regular: 'acme-software/main.js',
		pro: 'acme-software/main_pro.js',
	},
	{
		regular: 'acme-software/main_v2.js',
		pro: 'acme-software/main_v2_pro.js',
	},
	{
		regular: 'acme-software/main_v3.js',
		pro: 'acme-software/main_v3_pro.js',
	},
	{
		regular: 'acme-software/main_v4.js',
		pro: 'acme-software/main_v4_pro.js',
	},
]

var firstElementToRemove
var secondElementToRemove
var allScriptsOnPage

var intervalId = null
var numIntervalsExecuted = 0

var acmeScriptTagFoundAfterFirstSearch = false
var acmeScriptFoundAfterSecondSearch = false

window.onload = function () {
	allScriptsOnPage = document.getElementsByTagName('script')
	for (var i = 0; i < allScriptsOnPage.length; i++) {

		firstCheckOpsCount++
		if (allScriptsOnPage[i].src.includes("acme")) {
			acmeScriptTagFoundAfterFirstSearch = true;
		}

		// for (
		// 	var j = 0;
		// 	j < acmeSoftwareScriptPaths.length;
		// 	j++, firstCheckOpsCount++
		// ) {
		// 	if (
		// 		allScriptsOnPage[i].src.includes(acmeSoftwareScriptPaths[j].regular) ||
		// 		allScriptsOnPage[i].src.includes(acmeSoftwareScriptPaths[j].pro)
		// 	) {
		// 		acmeScriptTagFoundAfterFirstSearch = true
		// 	}
		// }

	}

	if (!acmeScriptTagFoundAfterFirstSearch) {
		intervalId = setInterval(function () {
			if (numIntervalsExecuted < 5) {
				numIntervalsExecuted++
				allScriptsOnPage = document.getElementsByTagName('script')
				for (var i = 0; i < allScriptsOnPage.length; i++) {	

					secondCheckOpsCount++
					if (allScriptsOnPage[i].src.includes("acme")) {
						acmeScriptTagFoundAfterFirstSearch = true;
					}

					// for (
					// 	var j = 0;
					// 	j < acmeSoftwareScriptPaths.length;
					// 	j++, secondCheckOpsCount++
					// ) {
					// 	if (
					// 		allScriptsOnPage[i].src.includes(
					// 			acmeSoftwareScriptPaths[j].regular
					// 		) ||
					// 		allScriptsOnPage[i].src.includes(acmeSoftwareScriptPaths[j].pro)
					// 	) {
					// 		acmeScriptFoundAfterSecondSearch = true
					// 	}
					// }

				}
			} else {
				if (!acmeScriptFoundAfterSecondSearch && firstElementToRemove && secondElementToRemove) {
					/**
					 * What is this code trying to do to `firstElementToRemove`
					 * and `secondElementToRemove`? Why is it producing an error?
					 *
					 * How can you allow this script to run without errors whether
					 * these elements do or don't exist?
					 */
					firstElementToRemove = document.getElementById('remove-me')
					firstElementToRemove.parentNode.removeChild(firstElementToRemove)

					secondElementToRemove = document.getElementById('remove-me-too')
					secondElementToRemove.parentNode.removeChild(secondElementToRemove)
				}
				clearInterval(intervalId)
			}
		}, 100)
	}

	/** Code related to your challenge ends here. */

	/**
	 * Wait 2 seconds to be sure setInterval has finished,
	 * then render a (simplified) report about how many operations
	 * the script took.
	 */
	setTimeout(() => {
		const reportEl = document.querySelector('.js-report')

		reportEl.innerHTML = `
			<h2>Efficiency report</h2>
			<p>First check for an ACME Software script: executed ${firstCheckOpsCount} operations during a for loop!</p>
			<p>Second check for an ACME Software script: ${secondCheckOpsCount} operations during ${numIntervalsExecuted} intervals!</p>
			<hr>
			<p>Executed <b>${firstCheckOpsCount + secondCheckOpsCount}</b> total operations looking for a ACME software script!</p>`
	}, 2000)
}
