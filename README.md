# Angular Testing Examples

Angular testing code examples for learning purposes 🎓

## Table of Contents

- [Why Writing Tests?](#why-writing-tests?)
- [Levels of Testing](#levels-of-testing)
  - [E2E](#e2e)
  - [Integration](#integration)
  - [Unit](#unit)
- [Testing Techniques](#testing-techniques)
  - [Black Box Testing](#black-box-testing)
  - [White Box Testing](#white-box-testing)
  - [Testing Technique Recommendation](#testing-technique-recommendation)
- [Structure of a Test](#structure-of-a-test)
- [How To Run Tests?](#how-to-run-tests?)
- [Useful Resources](#useful-resources)
- [License](#license)

## Why Writing Tests?

- Testing saves time and money 💰
- Testing formalizes and documents the requirements
- Testing ensures that the code implements the requirements and does not exhibit bugs
- Testing makes change safe by preventing regressions

## Levels of Testing

![Testing Pyramid](.github/images/testing-pyramid.png)

### E2E

E2E tests checks all the parts of the application from the user's perspective.

### Integration

Integration tests are when all the parts of one feature may be tested together.

An integration test proves that the parts work together properly.

### Unit

A unit is a small piece of code that is reasonable to test independently.

## Testing Techniques

### Black Box Testing

Black box testing does not assume anything about the internal structure.

It puts certain values into the box and expects certain output values.

The test talks to the publicly exposed, documented API.

The inner state and workings are not examined.

### White Box Testing

White box testing opens the box, sheds light on the internals and takes measurements by reaching into the box.

For example, a white box test may call methods that are not part of the public API, but still technically tangible.

Then it checks the internal state and expects that it has changed accordingly.

### Testing Technique Recommendation

It's recommended to use black box testing because you should check what the code does for the user and for other parts of the code.

For this purpose, it is not relevant how the code looks internally.

## Structure of a Test

Irrespective of the testing framework, the testing code typically consists of three phases: `Arrange`, `Act` and `Assert`.

1. `Arrange` is the preparation and setup phase. For example, the class under test is instantiated. Dependencies are set up. Spies and fakes are created.
2. `Act` is the phase where interaction with the code under test happens. For example, a method is called or an HTML element in the DOM is clicked.
3. `Assert` is the phase where the code behavior is checked and verified. For example, the actual output is compared to the expected output.

## How To Run Tests?

Run all tests.

```shell
npm run test:all
```

Run all tests with coverage report.

```shell
npm run test:all:coverage
```

## Useful Resources

[Jest Documentation](https://jestjs.io)

[Jest Extended Custom Matchers](https://github.com/jest-community/jest-extended)

[Jest DOM Custom Matchers](https://github.com/testing-library/jest-dom)

[Angular Testing Documentation](https://angular.io/guide/testing)

[Angular Testing Book](https://testing-angular.com)

[ng-mocks Documentation](https://ng-mocks.sudo.eu)

[Spectator](https://ngneat.github.io/spectator)

[Angular Testing Library](https://github.com/testing-library/angular-testing-library)

# License

[MIT](LICENSE)
