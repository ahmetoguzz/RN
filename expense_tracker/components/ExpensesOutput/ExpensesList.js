import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item}/>
    // return <ExpenseItem description={description} .../> you can also do like this
}

function ExpensesList({ expenses }) {
    return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
}

export default ExpensesList;