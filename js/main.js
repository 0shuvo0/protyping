function debounce(fn, delay){
	var id
	return function(...args){
		if(id) clearTimeout(id)
		id = setTimeout(function(){
			fn(...args)
			id = null
		}, delay)
	}
}


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
	return array
}



function $(selector, parent = document){
	return parent.querySelector(selector)
}


var codeBlock = $(".code-block")
var input = $('.editor')
var startModal = $('.startModal')
var startBtn = $('.startBtn')
var progressBar = $('.progress-bar')
var title = $('.title')
var info = $('.info')
var TAB = "  "
var diffRange = $('.diff-range')
var difficulty = 2

diffRange.addEventListener('change', function(){
	difficulty = 5.1 - (this.value / 10)
})

var levelUpSound = new Audio("sounds/levelup.mp3")
var gameOverSound = new Audio("sounds/gameover.mp3")
var youOwnSound = new Audio("sounds/youown.mp3")



var snippetMirror = CodeMirror.fromTextArea(codeBlock, {
	theme: 'ayu-dark',
	lineNumbers: true,
	readOnly: "nocursor"
})


var editor = CodeMirror.fromTextArea(input, {
	theme: 'ayu-dark',
	lineNumbers: true,
	viewportMargin: Infinity,
	autoCloseBrackets: true,
	autoCloseTags: true,
	mode: 'xml',
	extraKeys: {
		"Tab": function(cm){
			cm.replaceSelection(TAB, "end")
		}
	}
})


function displaySnippet(){
	var snippet = snippets.pop()
	var code = snippet.snippet.replace(/\t/g, TAB)
	var time = snippet.snippet.length * difficulty * 500
	
	snippetMirror.setOption('mode', snippet.type)
	editor.setOption('mode', snippet.type)
	snippetMirror.setValue(code)
	editor.setValue('')
	editor.focus()
	
	var gameTimer = setTimeout(handleGameOver, time)
	progressBar.style.animation = time + "ms progress linear"
	
	editor.on('change', function(cm){
		debounce(highlightMatch, 200)(cm.getValue(), code, gameTimer)
	})
}


function handleGameOver(){
	gameOverSound.play()
	startModal.classList.add('active')
	title.innerText = 'Times up!!!'
	info.innerHTML = 'Your time is up. But don\'t give up because practice makes perfect. You can definitely do this champ.'
}


var previouslyMarked
function highlightMatch(editorVal, snippet, timer){
	var editorValLen  = editorVal.length
	var snippetLen = snippet.length
	var len = Math.min(editorValLen, snippetLen)
	var line = 0
	var ch = 0
	var i = 0
	var broke = false
	while(i <= len){
		if(editorVal[i] !== snippet[i]){
			broke = true
			break
		}
		if(editorVal[i] == "\n"){
			line++
			ch = -1
		}
		ch++
		i++
	}
	if(previouslyMarked) previouslyMarked.clear()
	previouslyMarked = snippetMirror.markText({line: 0, ch: 0}, {line: line, ch: ch}, {className: "styled-background"})
	
	if(editorValLen == snippetLen && !broke){
		clearTimeout(timer)
		progressBar.style.animation = "none"
		if(previouslyMarked) previouslyMarked.clear()
		if(snippets.length > 0){
			levelUpSound.play()
			displaySnippet()
		}else{
			youOwnSound.play()
			title.innerText = 'You rock!!!'
			info.innerHTML = 'Congratulations you\'re the boss, you have set the keyboard on fire and cleared all levels.'
			startModal.classList.add('active')
		}
	}
}


var snippets
function startGame(){
	startBtn.innerText = "Play Again"
	snippets = [...shuffle(codeSnippets)]
	progressBar.style.animation = "none"
	startModal.classList.remove('active')
	displaySnippet()
}


window.addEventListener('DOMContentLoaded', function(){
	startBtn.addEventListener('click', startGame)
	document.body.removeChild($('.loader'))
})