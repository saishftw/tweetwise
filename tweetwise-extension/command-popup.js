const commandPopup = document.getElementById('command-popup');

let currentSelectedIndex = 0;
const commands = [
    { name: ACTIONS.SUMMARY, color: "#007bff", shape: '<circle cx="50" cy="50" r="40" fill="white" />' },
    { name: ACTIONS.SENTIMENT, color: "#28a745", shape: '<rect x="20" y="20" width="60" height="60" fill="white" />' },
    { name: ACTIONS.FACTCHECK, color: "#ffc107", shape: '<polygon points="50,15 90,85 10,85" fill="white" />' },
    { name: ACTIONS.SIMPLIFY, color: "#dc3545", shape: '<polygon points="50,10 90,50 50,90 10,50" fill="white" />' },
];

chatInput.addEventListener('keydown', function (e) {
    // Allow typing '/'
    if (e.key === '/') {
        // Slight delay to let '/' appear in input
        setTimeout(() => {
            showCommandPopup('');
        }, 0);
    }

    // Handle arrow key navigation
    if (commandPopup.style.display === 'block') {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateCommands(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateCommands(-1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            selectCommand();
            hideCommandPopup();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            hideCommandPopup();
        }
    }
});

chatInput.addEventListener('input', function (e) {
    if (this.value.startsWith('/')) {
        showCommandPopup(this.value.substring(1));
    } else {
        hideCommandPopup();
    }
});

function showCommandPopup(searchTerm) {
    // Clear previous commands
    commandPopup.innerHTML = '';

    const filteredCommands = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredCommands.length > 0) {
        filteredCommands.forEach(cmd => {
            const commandValue = cmd.name.toLowerCase()
            const commandItem = document.createElement('div');
            commandItem.classList.add('command-item');
            commandItem.textContent = commandValue;

            // Create SVG container
            // const icon = document.createElement('div');
            // icon.classList.add('command-icon');
            // icon.innerHTML = `
            //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
            //         ${cmd.shape}
            //     </svg>
            // `;

            // Create text container
            // const text = document.createElement('div');
            // text.textContent = cmd.name.toLowerCase();

            // Select command when clicked
            commandItem.addEventListener('click', () => {
                chatInput.value = '/' + commandValue + ' ';
                hideCommandPopup();
                chatInput.focus();
            });

            // Append icon and text to the command item
            // commandItem.appendChild(icon);
            // commandItem.appendChild(text);

            commandPopup.appendChild(commandItem);
        });

        // Show popup
        commandPopup.style.display = 'block';
    } else {
        hideCommandPopup();
    }
}

// Hide command popup
function hideCommandPopup() {
    commandPopup.style.display = 'none';
    commandPopup.innerHTML = '';
}

function navigateCommands(direction) {
    if (commands.length === 0) return;

    // Remove previous selection
    const prevSelected = commandPopup.querySelector('.selected');
    if (prevSelected) prevSelected.classList.remove('selected');

    // Update index
    currentSelectedIndex += direction;
    if (currentSelectedIndex < 0) currentSelectedIndex = commands.length - 1;
    if (currentSelectedIndex >= commands.length) currentSelectedIndex = 0;

    // Select new command
    const commandItems = commandPopup.querySelectorAll('.command-item');
    commandItems[currentSelectedIndex]?.classList.add('selected');
}

// Select current command
function selectCommand() {
    if (currentSelectedIndex >= 0 && currentSelectedIndex < commands.length) {
        const selectedCmd = commands[currentSelectedIndex];
        chatInput.value = '/' + selectedCmd.name.toLowerCase() + ' ';
    }
}

// Close popup if clicked outside
document.addEventListener('click', function (e) {
    if (!chatInput.contains(e.target) && !commandPopup.contains(e.target)) {
        hideCommandPopup();
    }
});