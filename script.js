// ---------- HEURISTIC ANALYSIS ----------
function calculateHeuristicRisk(url) {
  let risk = 0;

  if (url.length > 75) risk += 2;                    // Long URL
  if (/\d+\.\d+\.\d+\.\d+/.test(url)) risk += 3;    // IP address
  if (/login|verify|bank|secure|update|account/i.test(url)) risk += 2;
  if (!url.startsWith("https://")) risk += 1;       // No HTTPS
  if ((url.match(/\./g) || []).length > 5) risk += 1;
  if (url.includes("-")) risk += 1;
  if (/bit\.ly|tinyurl|t\.co|goo\.gl/i.test(url)) risk += 3;
  if (/\.(xyz|top|tk|ml|ga)$/i.test(url)) risk += 2;

  return risk;
}

// ---------- AI PREDICTION (SIMULATED ML MODEL) ----------
function aiPrediction(url) {
  let probability = Math.random() * 50; // base AI confidence

  if (/login|bank|verify|secure/i.test(url)) probability += 20;
  if (url.length > 80) probability += 10;
  if (!url.startsWith("https://")) probability += 10;
  if (/\d+\.\d+\.\d+\.\d+/.test(url)) probability += 15;

  if (probability > 100) probability = 100;
  return Math.round(probability);
}

// ---------- FINAL DECISION ENGINE ----------
function scanURL() {
  const url = document.getElementById("url").value.trim();
  const result = document.getElementById("result");

  if (!url) {
    result.innerHTML = "⚠️ Please enter a URL";
    result.style.color = "orange";
    return;
  }

  const heuristicScore = calculateHeuristicRisk(url);
  const aiScore = aiPrediction(url);

  // Hybrid decision
  if (heuristicScore >= 7 || aiScore >= 75) {
    result.innerHTML =
      "🚨 HIGH RISK PHISHING DETECTED<br>" +
      "Heuristic Score: " + heuristicScore +
      "<br>AI Confidence: " + aiScore + "%";
    result.style.color = "red";
  } 
  else if (heuristicScore >= 4 || aiScore >= 50) {
    result.innerHTML =
      "⚠️ MEDIUM RISK – BE CAREFUL<br>" +
      "Heuristic Score: " + heuristicScore +
      "<br>AI Confidence: " + aiScore + "%";
    result.style.color = "darkorange";
  } 
  else {
    result.innerHTML =
      "✅ LOW RISK – LINK APPEARS SAFE<br>" +
      "Heuristic Score: " + heuristicScore +
      "<br>AI Confidence: " + aiScore + "%";
    result.style.color = "green";
  }
}
