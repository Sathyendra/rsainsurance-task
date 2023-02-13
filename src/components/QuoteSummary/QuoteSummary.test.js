import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import QuoteSummary from './QuoteSummary';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("QuoteSummary component", () => {
  it("updates stateValue when setStateValue is called", () => {
    act(() => {
      render(<QuoteSummary />, container);
    });
    const component = container.querySelector(".container");
    expect(component.querySelector("stateValue").textContent).toBe("monthly");
    act(() => {
      component.setStateValue("annually");
    });
    expect(component.querySelector("stateValue").textContent).toBe("annually");
  });

  it("updates stateTotal when getData is called", () => {
    act(() => {
      render(<QuoteSummary />, container);
    });
    const component = container.querySelector(".container");
    expect(component.querySelector("stateTotal").textContent).toBe("{}");
    act(() => {
      component.getData({price: 100});
    });
    expect(component.querySelector("stateTotal").textContent).toBe("{price: 100}");
  });

  it("renders Quote component with stateTotal and setStateValue props", () => {
    act(() => {
      render(<QuoteSummary />, container);
    });
    const quoteComponent = container.querySelector(".quote-component");
    expect(quoteComponent.props.stateTotal).toBeDefined();
    expect(quoteComponent.props.setStateValue).toBeDefined();
  });

  it("renders Addons component with stateValue and getExtras props", () => {
    act(() => {
      render(<QuoteSummary />, container);
    });
    const addonsComponent = container.querySelector(".addons-component");
    expect(addonsComponent.props.stateValue).toBeDefined();
    expect(addonsComponent.props.getExtras).toBeDefined();
  });
});
