fn main() {
    // Path to the directory containing both llama.dll and llama.lib
    // Make sure this path is relative to your crate's root, 
    // or use an absolute path if necessary.
    println!("cargo:rustc-link-search=native=E:\\GitHub\\ahqai-llama.cpp\\llama-sys\\llama"); 

    // Tell Cargo to link against the dynamic library 'llama'. 
    // This uses the 'llama.lib' at compile time and looks for 'llama.dll' at runtime.
    println!("cargo:rustc-link-lib=dylib=llama"); 

    // ... (Your existing bindgen code goes here)
}