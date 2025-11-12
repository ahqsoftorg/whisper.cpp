use std::{ffi::CString, str::FromStr};

use llama_sys::raw::{llama_backend_free, llama_backend_init, llama_load_model_from_file, llama_model_default_params, llama_model_free};

fn main() {
  unsafe {

    llama_backend_init();

    let path = CString::from_str("./gemma.gguf").expect("Impossible");

    let model = llama_load_model_from_file(path.as_ptr(), llama_model_default_params());

    llama_model_free(model);
    llama_backend_free();
  }
}