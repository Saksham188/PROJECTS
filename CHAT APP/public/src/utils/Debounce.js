// It will check for certain amount of time if function is called.and it will call after certain amount of time
export const debounce = (fn, timeout=300) => {
    let timer;
    return (...args) => {
        // if function called before 300ms then debounce will be called but checkusername will be called after 3sec only.
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, timeout);
    };
  };