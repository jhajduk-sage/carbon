Feature: Accessibility tests - Experimental folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "default story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations boolean story
    When I open "Experimental <component>" component page "validations boolean" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations string story
    When I open "Experimental <component>" component page "validations string component" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations string label story
    When I open "Experimental <component>" component page "validations string label" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |

  @accessibility
  Scenario: Component radiobutton with legend and labels story
    When I open "Experimental radiobutton" component page "with legend and labels" in no iframe
    Then "radiobutton with legend and labels story" component has no accessibility violations

  @accessibility
  Scenario: Experimental RadioButton component with-validations-on-buttons story
    When I open "Experimental RadioButton" component page "with-validations-on-buttons" in no iframe
    Then "Experimental RadioButton with-validations-on-buttons story" component has no accessibility violations