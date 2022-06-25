const make = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);

  if (typeof classNames === "string") {
    element.classList.add(classNames);
  } else {
    classNames.forEach((className) => {
      element.classList.add(className)
    });
}
  for (let attributeName in attributes) {
    element[attributeName] = attributes[attributeName];
  }

  return element;
}

export { make };