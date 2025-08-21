"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor() {
        this.users = [];
    }
    async signup(name, email, password) {
        const hash = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), name, email, password: hash };
        this.users.push(user);
        return user;
    }
    async validateUser(email, password) {
        const user = this.users.find(u => u.email === email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user)
            return null;
        return user;
    }
    async getProfile(userId) {
        return this.users.find(u => u.id === userId);
    }
    async updateProfile(userId, name, email) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.name = name;
            user.email = email;
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map