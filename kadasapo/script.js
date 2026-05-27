const questions = [
  {
    id: 0,
    correct: "ローカル",
    choices: "「ローカル」または「リモート」",
    okMsg:
      "✅ 正解！ git add / commit / push はすべてローカル（VSCode のターミナル）で実行します。GitHub（ブラウザ）はリモートの操作に使うよ。",
    ngMsg:
      "❌ もう一度！ VSCode のターミナルで打つコマンドはどちら？「ローカル」か「リモート」で答えよう。",
  },
  {
    id: 1,
    correct: "①②③④",
    choices: "「①②③④」または「②①③④」または「①③②④」",
    okMsg:
      "✅ 正解！ブランチを切る(①) → add&commit(②) → push(③) → PR作成(④) がフルフローです！",
    ngMsg:
      "❌ もう一度！ ブランチを切ってからコードを書く → 記録 → 送る → 報告 の順番を確認しよう。",
  },
  {
    id: 2,
    correct: "PRを作る",
    choices: "「Issueを作る」または「PRを作る」または「cloneし直す」",
    okMsg:
      "✅ 正解！ push のあとはブラウザで PR（プルリクエスト）を作って、main への合流を依頼します。",
    ngMsg:
      "❌ もう少し！ push でコードを送った後は、ブラウザで「変更を取り込んでください」とお願いする操作が必要だよ。",
  },
];

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCode(q) {
  const el = document.getElementById("answer" + q.id);
  const val = el ? el.getAttribute("data-answer") || "" : "";
  const codeEl = document.getElementById("code" + q.id);

  const isCorrect = val.trim() === q.correct;
  const isEmpty = val === "";

  let valHtml;
  if (isEmpty) {
    valHtml = `<span class="placeholder">ここに答えを書く</span>`;
  } else if (isCorrect) {
    valHtml = `<span class="filled-ok">${escHtml(val)}</span>`;
  } else {
    valHtml = `<span class="filled-ng">${escHtml(val)}</span>`;
  }

  codeEl.innerHTML =
    `&lt;!-- 選択肢: ${escHtml(q.choices)} --&gt;\n` +
    `&lt;div id="answer${q.id}" data-answer="${valHtml}"&gt;&lt;/div&gt;`;
}

function evaluate(q) {
  const el = document.getElementById("answer" + q.id);
  const val = el ? el.getAttribute("data-answer") || "" : "";
  const isCorrect = val.trim() === q.correct;
  const isEmpty = val === "";

  const qDiv = document.getElementById("q" + q.id);
  const fb = document.getElementById("fb" + q.id);
  const dot = document.getElementById("dot" + q.id);

  if (isEmpty) {
    qDiv.className = "question";
    fb.className = "feedback";
    dot.className = "dot";
    return;
  }
  if (isCorrect) {
    qDiv.className = "question ok";
    fb.className = "feedback show ok";
    fb.textContent = q.okMsg;
    dot.className = "dot ok";
  } else {
    qDiv.className = "question ng";
    fb.className = "feedback show ng";
    fb.textContent = q.ngMsg;
    dot.className = "dot ng";
  }
}

function updateScore() {
  let s = 0;
  questions.forEach((q) => {
    const el = document.getElementById("answer" + q.id);
    const val = el ? el.getAttribute("data-answer") || "" : "";
    if (val.trim() === q.correct) s++;
  });
  document.getElementById("score-text").textContent = s + " / 3";
}

questions.forEach((q) => {
  renderCode(q);
  evaluate(q);
});
updateScore();
Ï