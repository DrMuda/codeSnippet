import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import './Calculator.less';

const levelMap = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2,
};
const buttonList = [
	['(', ')', '清空', '删除'],
	[7, 8, 9, '*'],
	[4, 5, 6, '/'],
	[1, 2, 3, '+'],
	['.', 0, '=', '-'],
];
const id = `${new Date().getTime()}_${Math.random()}`;
let self = null;
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: `${props.value === undefined ? '' : props.value}`.split(''),
			show: false,
			result: props.value,
		};
		self = this;
	}

	// 中缀表达式转为后缀表达式（堆栈式转换）
	// 从左往右扫描， 如果是数字，直接输出， 如果是符号， 判断栈顶运算符优先级是否小于当前运算符或者是否栈空，如果是，入栈
	// 否则出栈一个， 再入栈，入栈前也要判断运算符
	toPostfixExpression(infixExpression) {
		let count = 0;
		const stack = [];
		const output = [];
		for (let i = 0; i < infixExpression.length; i += 1) {
			const val = infixExpression[i];
			if (typeof val === 'number') {
				output.push(val);
			} else {
				if (val === '(') {
					stack.push(val);
				} else if (val === ')') {
					while (true && count < 100000000) {
						count += 1;
						const top = stack.pop();
						if (top === '(') {
							break;
						} else {
							output.push(top);
						}
					}
				} else {
					let top = stack[stack.length - 1];
					if (top) {
						while (true && count < 100000000) {
							count += 1;
							if (levelMap[top] > levelMap[val]) {
								output.push(stack.pop());
							} else {
								stack.push(val);
								break;
							}
							top = stack[stack.length - 1];
						}
					} else {
						stack.push(val);
					}
				}
			}
		}
		while (true && count < 100000000) {
			count += 1;
			if (stack.length <= 0) {
				break;
			} else {
				output.push(stack.pop());
			}
		}
		if (count >= 100000000) {
			message.error('运算过久，检查算式是否正确或过长');
			return undefined;
		}
		return output;
	}

	// 计算后缀表达式
	// 读取后缀表达式，如果是数字，入栈，如果是符号，出栈两个a,b， 用b运算a，得到的结果入栈
	// 最后栈顶的则是计算结果（理论上栈中只有一个数字）
	calcPostfixExpression(postfixExpression) {
		const stack = [];
		for (let i = 0; i < postfixExpression.length; i += 1) {
			const val = postfixExpression[i];
			if (typeof val === 'number') {
				stack.push(val);
			} else {
				const a = stack.pop();
				const b = stack.pop();
				let c = 0;
				switch (val) {
					case '*': {
						c = b * a;
						break;
					}
					case '/': {
						c = b / a;
						break;
					}
					case '+': {
						c = b + a;
						break;
					}
					case '-': {
						c = b - a;
						break;
					}
				}
				stack.push(c);
			}
		}
		return stack[0];
	}

	// 当按下按钮时， 根据按钮的值做出相应的操作
	onBtnClick(val) {
		const { value } = this.state;
		if (val === '=') {
			try {
				const expression = [];
				let start = 0;
				let end = 0;
				// value是完全分散的字符或数字，所以需要数字部分组合起来
				value.forEach((val2, index) => {
					// 从左往右扫描，如果是数字，则end+1，直到不再是数字(小数点除外)，裁剪start到end部分作为一个数字，将其parseFloat,然后start和end指向下一个位置
					// 如果是字符则再考虑负号，当扫描到负号"-"，判断负号前面是否有字符(左括号"("除外)或数字或左括号，如果有则说明这只是一个运算符
					// 否则认为是数字的一部分，end+1
					if (typeof val2 !== 'number') {
						if (val2 !== '.') {
							if (val2 !== '-') {
								if (start !== end) {
									expression.push(parseFloat(value.slice(start, end).join('')));
								}
								expression.push(val2);
								start = index + 1;
								end = index + 1;
							} else {
								if (value[index - 1] !== undefined && value[index - 1] !== '(') {
									expression.push('-');
									start = index + 1;
									end = index + 1;
								} else {
									end += 1;
								}
							}
						} else {
							end += 1;
						}
					} else {
						end += 1;
					}
				});
				if (start !== end) {
					expression.push(parseFloat(value.slice(start, end).join('')));
				}
				const postfixExpression = this.toPostfixExpression(expression);
				if (postfixExpression) {
					let result = this.calcPostfixExpression(postfixExpression);
					if (!Number.isNaN(result)) {
						this.setState({
							// Input框使用的是将每一个字符拼合起来展示，同时删除按钮也可以逐字符删除
							value: `${result}`.split('').map((char) => {
								if (Number.isNaN(parseInt(char, 10))) {
									return char;
								}
								return parseInt(char, 10);
							}),
							result,
							show: false,
						});
						this.props.onChange?.(result);
					} else {
						this.setState({
							value: `error`.split(''),
						});
					}
				} else {
					this.setState({
						value: `error`.split(''),
					});
				}
			} catch (e) {
				console.error(e);
				this.setState({
					value: 'error'.split(''),
				});
			}
		} else if (val === '清空') {
			this.setState({
				value: [],
				result: undefined,
			});
			this.props.onChange?.(undefined);
		} else if (val === '删除') {
			this.setState({
				value: value.slice(0, value.length - 1),
			});
		} else {
			this.setState({
				value: [...value, val],
			});
		}
	}

	render() {
		const { show } = this.state;
		const { width, height, onCalc, placeholder } = this.props;
		return (
			<div
				style={{
					display: 'inline-block',
					width: width || '100%',
					height: height || '100%',
				}}
				className="dr-muda-calculator"
				onCalc={() => {
					onCalc(this.state.value);
				}}
			>
				<Input
					placeholder={placeholder}
					style={{
						width: '100%',
						height: '100%',
					}}
					value={this.state.value.join('')}
					onClick={() => {
						this.setState(
							{
								show: !show,
							},
							() => {
								if (!this.state.show) {
									this.setState({
										value: `${
											this.state.result === undefined ? '' : this.state.result
										}`.split(''),
									});
								}
							},
						);
					}}
					readOnly={true}
					onChange={(e) => {
						this.setState({
							value: e.target.value.split('').map((val) => {
								if (Number.isNaN(parseInt(val))) {
									return val;
								} else {
									return parseInt(val);
								}
							}),
						});
					}}
					onBlur={() => {
						this.setState({
							inputIsBlur: true,
						});
					}}
				/>
				<div className={show ? 'btnArea btnArea-show' : 'btnArea'} id={id}>
					{buttonList.map((row, index) => {
						const rowList = [];
						const btnEleList = row.map((btn, index2) => {
							return (
								<Button
									key={index2}
									onClick={() => {
										self.onBtnClick(btn);
									}}
								>
									{btn}
								</Button>
							);
						});
						rowList.push(<div key={index}>{btnEleList}</div>);
						return rowList;
					})}
				</div>
			</div>
		);
	}
}

export default Index;
