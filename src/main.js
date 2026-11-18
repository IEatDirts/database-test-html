import { createClient } from "https://jsdelivr.net";

const supabase = createClient("https://pxgqeoldgxmimhpvtydt.supabase.co", "sb_publishable_m2l_CBj5zJHOJhIL2_eehw_J9UD-6hq");

export function updateStartButton() {
    const startButton = document.getElementById("start_btn");
    const selectedCount = document.querySelectorAll("#buttons .selected").length;
    startButton.disabled = selectedCount < 2;
}

async function testDatabase() {
    const testText = document.getElementById("db_test");

    const { data, error } = await supabase
        .from("Generic")
        .select("*")
        .limit(1);

    if (error) {
        testText.textContent = "Error: " + error.message;
        return;
    }

    if (data.length === 0) {
        testText.textContent = "Connected! (Table is empty or RLS policy is blocking read access)";
        return;
    }

    testText.textContent = "Success: " + JSON.stringify(data[0]);
}

export function init() {
    const toggles = document.querySelectorAll("#buttons button");

    toggles.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
            updateStartButton();
        });
    });
}