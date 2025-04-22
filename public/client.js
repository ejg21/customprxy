function launchProy() {
  const url = document.getElementById('urlInput').value;
  if (!url) return alert("Please enter a URL.");
  window.location.href = '/proy/' + encodeURIComponent(url);
}
