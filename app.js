$(function () {

    keyboardEvents();

    var $data, $value, $description, $valueType, $budgetValue;
    $data = {
        'income': 0,
        'expenses': 0,
        'total': function () {
            return this.income - this.expenses;
        }
    }

    $budgetValue = $('.budget__value');


    $('.add__btn').on('click', function () {

        $value = parseInt($('.add__value').val());
        $description = $('.add__description').val();
        $valueType = $('.add__type').val();


        if ($value > 0) {

            $('.' + $valueType + '__list').append(budgetItem($description, $value, $valueType === 'income' ? '+' : '-'));


            if ($valueType === 'income') {
                $data.income = $data.income + $value;
                $(".budget__" + $valueType + "--value").text("+" + $data.income);
            }

            if ($valueType === 'expenses') {
                $data.expenses = $data.expenses + $value;
                $(".budget__" + $valueType + "--value").text("-" + $data.expenses);
            }

            totalBudget($budgetValue, $data.total());
            resetFields();

        }

    });


    $('body').on('click', '.item__delete--btn', function () {
        var $this, $item, $exactValue, $value, $currentBudgetValue;
        $this = $(this);
        $item = $this.closest('.item');
        $exactValue = $item.find('.item__value').text();
        $value = parseInt($exactValue.match(/\d+/)[0]);
        $currentBudgetValue = parseInt($budgetValue.text());


        if ($exactValue.indexOf('+') > -1) {
            $data.income = $data.income - $value;
            $(".budget__income--value").text("+" + $data.income);
        } else {
            $data.expenses = $data.expenses - $value;
            $(".budget__expenses--value").text("-" + $data.expenses);
        }

        $item.remove();

        totalBudget($budgetValue, $data.total());

    });

});




function budgetItem($description, $value, $valueSymbol) {
    let $html;

    return $html = `<div class="item clearfix">
                            <div class="item__description">${$description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${$valueSymbol} ${$value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

}


function totalBudget($target, $val) {

    if ($val > 0) {
        $val = '+' + $val;
    }

    $target.text($val);

}

function resetFields() {
    $('.add__value').val("");
    $('.add__description').val("");
}

function keyboardEvents() {

    $("body").on('keyup', function (e) {
        var $keyCode = e.keyCode;



        // Enter Key Event
        if ($keyCode === 13) {
            if ($('.add__value') != '' && $('.add__description') != '')
                console.log($keyCode);
            $('.add__btn').trigger('click');
        }

        // Escape Key Event
        if ($keyCode === 27) {
            resetFields();
        }

    });

}
