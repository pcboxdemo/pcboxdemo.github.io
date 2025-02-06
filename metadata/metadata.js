function generateTemplateLayout(template,containerId) {
    // Create a parent div element to hold the form
    const $formContainer = $('#' + containerId);
    
    // Get the current date
    const today = new Date();
    
    // Calculate 10 years ago from today
    const pastDate = new Date(today);
    pastDate.setFullYear(today.getFullYear() - 10);
    
    // Calculate 10 years in the future from today
    const futureDate = new Date(today);
    futureDate.setFullYear(today.getFullYear() + 10);
    
    // Format date to 'YYYY-MM-DD' for date input fields
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Variable to track the number of fields per row
    let $row = $('<div>').addClass('row mb-2');
    let fieldCount = 0;
  
    // Iterate through the fields in the template
    template.fields.forEach(field => {
        // Create a div to wrap each form element (col)
        const $formGroup = $('<div>').addClass('mb-2 col-md-3'); // Change col-md-4 to col-md-3 for 4 fields per row

        // Create a label for the field
        const $label = $('<label>')
            .text(field.displayName)
            .attr('for', field.key)
            .addClass('form-label');

        // Append label to form group
        $formGroup.append($label);

        // Switch case for different field types
        switch (field.type) {
            
            case 'string':
                // Handle string input as a text input field
                $label.text($label.text() + " (will generate random value)");
               
                const $textInput = $('<input>')
                    .attr('type', 'text')
                    .attr('display', field.displayName)
                    .addClass('form-control')
                    .attr('id', field.key)
                    .attr('name', field.key)
                    .attr('value','');
                $formGroup.append($textInput);
                break;
            
            case 'float':
                // Handle float input as two number input fields (side by side)
                $label.text($label.text() + " (between)");
                const $numberInputGroup = $('<div>').addClass('d-flex gap-2');
                
                const $numberInputFrom = $('<input>')
                    .attr('type', 'number')
                    .addClass('form-control mb-2 nofill')
                    .attr('id', `${field.key}_from`)
                    .attr('name', `${field.key}_from`)
                    .attr('placeholder', 'From')
                    .val(0)
                    .css('flex', '1');  // Set width to half of the row
                
                const $numberInputTo = $('<input>')
                    .attr('type', 'number')
                    .addClass('form-control mb-2 nofill')
                    .attr('id', `${field.key}_to`)
                    .attr('name', `${field.key}_to`)
                    .attr('placeholder', 'To')
                    .val(10000)
                    .css('flex', '1');  // Set width to half of the row

                $numberInputGroup.append($numberInputFrom).append($numberInputTo);
                $formGroup.append($numberInputGroup);
                break;
            
            case 'date':
                // Handle date input as two date input fields (side by side)
                $label.text($label.text() + " (between)");
                const $dateInputGroup = $('<div>').addClass('d-flex gap-2');

                const $dateInputFrom = $('<input>')
                    .attr('type', 'date')
                    .addClass('form-control mb-2 nofill')
                    .attr('id', `${field.key}_from`)
                    .attr('name', `${field.key}_from`)
                    .attr('placeholder', 'From')
                    .val(formatDate(pastDate))
                    .css('flex', '1');  // Set width to half of the row
                
                const $dateInputTo = $('<input>')
                    .attr('type', 'date')
                    .addClass('form-control mb-2 nofill')
                    .attr('id', `${field.key}_to`)
                    .attr('name', `${field.key}_to`)
                    .attr('placeholder', 'To')
                    .val(formatDate(futureDate))
                    .css('flex', '1');  // Set width to half of the row
                
                $dateInputGroup.append($dateInputFrom).append($dateInputTo);
                $formGroup.append($dateInputGroup);
                break;
            
            case 'enum':
                // Handle enum as a select dropdown (single selection)
                $label.text($label.text() + " (possible values)");
                const $enumSelect = $('<select>')
                    .addClass('form-select normal nofill')
                    .attr('id', field.key);
                
                field.options.forEach(option => {
                    const $option = $('<option>')
                        .val(option.key)
                        .text(option.key);
                    $enumSelect.append($option);
                });
                $formGroup.append($enumSelect);
                break;
            
            case 'multiSelect':
                $label.text($label.text() + " (possible values)");
                // Handle multiSelect as a select dropdown with multiple options
                const $multiSelect = $('<select>')
                    .addClass('form-select normal')
                    .attr('id', field.key)
                    .attr('multiple', true);
                
                field.options.forEach(option => {
                    const $option = $('<option>')
                        .val(option.key)
                        .text(option.key);
                    $multiSelect.append($option);
                });
                $formGroup.append($multiSelect);
                break;
        }

        // Add the form group (column) to the current row
        $row.append($formGroup);
        fieldCount++;
        
        // If there are 4 fields in the current row, append the row to the container and reset
        if (fieldCount % 4 === 0) {
            $formContainer.append($row);
            $row = $('<div>').addClass('row mb-2');  // Start a new row
        }
    });
    
    // Append the last row if it contains any remaining fields
    if (fieldCount % 4 !== 0) {
        $formContainer.append($row);
    }
}

function generateFieldList(template, containerId) {
    // Select the container element
    const $container = $('#' + containerId);

    // Create a <ul> element
    const $list = $('<ul>').addClass('list-group');

    // Iterate over the fields and create list items
    template.fields.forEach(field => {
        const $listItem = $('<li>')
            .addClass('list-group-item')
            .text(`${field.displayName} (${field.type})`);
        
        $list.append($listItem);
    });

    // Append the list to the container
    $container.html($list);
}
