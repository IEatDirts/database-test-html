const supabase = window.supabase.createClient("https://pxgqeoldgxmimhpvtydt.supabase.co", "sb_publishable_m2l_CBj5zJHOJhIL2_eehw_J9UD-6hq");

export async function initUpload() {
    const loginSection = document.getElementById("login_section");
    const uploadSection = document.getElementById("upload_section");
    const userInfo = document.getElementById("user_info");
    const statusText = document.getElementById("upload_status");

    // Helper to switch between Login and Logged-In views
    function showLoggedIn(user) {
        loginSection.style.display = "none";
        uploadSection.style.display = "block";
        userInfo.textContent = "Logged in as: " + user.email;
        statusText.textContent = "";
    }

    // 1. Check if you already have an active session on page load
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showLoggedIn(session.user);
    }

    // 2. Handle Login
    document.getElementById("login_btn").addEventListener("click", async function () {
        const email = document.getElementById("email_input").value.trim();
        const password = document.getElementById("password_input").value;

        if (!email || !password) {
            statusText.textContent = "Please enter both email and password.";
            return;
        }

        statusText.textContent = "Logging in...";
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            statusText.textContent = "Login failed: " + error.message;
        } else {
            showLoggedIn(data.user);
        }
    });

    // 3. Handle Logout
    document.getElementById("logout_btn").addEventListener("click", async function () {
        await supabase.auth.signOut();
        uploadSection.style.display = "none";
        loginSection.style.display = "block";
        statusText.textContent = "Logged out.";
    });
}